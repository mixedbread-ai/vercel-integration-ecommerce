export interface ProductMetadata {
  name: string;
  color?: string;
  price?: number;
  style?: string;
  gender?: string;
  season?: string;
  pattern?: string;
  category?: string;
  filename?: string;
  material?: string;
  description?: string;
  notable_details?: string;
}

export interface SearchChunk {
  text?: string;
  score?: number;
  image_url?: {
    url: string;
  };
  metadata?: ProductMetadata;
}

export interface SearchResponse {
  results: SearchChunk[];
}

export interface ContainsFilesResponse {
  containsFiles: boolean;
}
