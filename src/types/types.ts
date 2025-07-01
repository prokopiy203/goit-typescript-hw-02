export interface Data {
  total: number;
  total_pages: number;
  results: Image[];
}

export interface Image {
  id: string;
  created_at: string;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  likes: number;
  liked_by_user: boolean;
  description: string | null;
  alt_description: string | null;
  user: User;
  current_user_collections: unknown[];
  urls: Urls;
  links: ImageLinks;
}

export interface ImageLinks {
  self: string;
  html: string;
  download: string;
  download_location?: string;
}

export interface Urls {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
}

export interface User {
  id: string;
  username: string;
  name: string;
  first_name: string;
  last_name: string;
  instagram_username: string | null;
  twitter_username: string | null;
  portfolio_url: string | null;
  profile_image: ProfileImage;
  links: UserLinks;
  social?: {
    portfolio_url?: string;
  };
}

export interface UserLinks {
  self: string;
  html: string;
  photos: string;
  likes: string;
}

export interface ProfileImage {
  small: string;
  medium: string;
  large: string;
}

export interface ModalImage {
  src: string;
  alt: string | null;
  description: string | null;
  links: ImageLinks;
}

export interface SearchParams {
  query: string;
  page: number;
}
