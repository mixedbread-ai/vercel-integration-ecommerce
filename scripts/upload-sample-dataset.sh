#!/bin/bash

echo "Uploading sample dataset..."

if [ -z "$MXBAI_API_KEY" ]; then
    echo "MXBAI_API_KEY is not set"
    exit 0
fi

if [ -z "$MXBAI_STORE_ID" ]; then
    echo "MXBAI_STORE_ID is not set"
    exit 0
fi

# Check if store contains any files
response=$(curl -s -X 'POST' \
  "https://api.mixedbread.com/v1/stores/$MXBAI_STORE_ID/files/list" \
  -H 'accept: application/json' \
  -H "Authorization: Bearer $MXBAI_API_KEY" \
  -H 'Content-Type: application/json' \
  -d '{
  "limit": 1,
  "include_total": false
}')

# Check if the response contains any files
file_count=$(echo "$response" | jq '.data | length')

echo "Response: $response"
echo "File count: $file_count"

if [ "$file_count" = "null" ] || [ "$file_count" -eq 0 ] 2>/dev/null; then
    echo "Store is empty, uploading sample files..."
    # Upload sample dataset file
    response=$(curl -X 'POST' \
      "https://api.mixedbread.com/v1/files" \
      -H 'accept: application/vnd-mxbai.chunks-json' \
      -H "Authorization: Bearer $MXBAI_API_KEY" \
      -H 'Content-Type: multipart/form-data' \
      -F 'file=@public/sample-data/images.mxjson;type=application/vnd-mxbai.chunks-json')

      file_id=$(echo "$response" | jq -r '.id')
      echo "File ID: $file_id"

      # Upload sample dataset file
      response=$(curl -X 'POST' \
        "https://api.mixedbread.com/v1/stores/$MXBAI_STORE_ID/files" \
        -H 'accept: application/json' \
        -H 'Content-Type: application/json' \
        -H "Authorization: Bearer $MXBAI_API_KEY" \
        -d '{
        "metadata": {},
        "config": {
            "parsing_strategy": "fast",
            "contextualization": false
        },
        "file_id": "'$file_id'"
        }')

      echo "Sample dataset uploaded successfully"
      echo "Response: $response"\

      file_store_id=$(echo "$response" | jq -r '.id')
      echo "File store ID: $file_store_id"

      while [ 1 ]; do
        response=$(curl -X 'GET' \
          "https://api.mixedbread.com/v1/stores/$MXBAI_STORE_ID/files/$file_store_id?return_chunks=false" \
          -H 'accept: application/json' \
          -H "Authorization: Bearer $MXBAI_API_KEY")

        echo "Response: $response"
        ingestion_status=$(echo "$response" | jq -r '.status')
        echo "Ingestion status: $ingestion_status"
        if [ "$ingestion_status" != "pending" ] && [ "$ingestion_status" != "in_progress" ]; then
          break
        fi
        sleep 2
      done

      echo "File ingested successfully"
else
    echo "Store already contains files, skipping upload"
fi
