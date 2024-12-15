export type RandomImageRequest = {
  query: string;
};

export type RandomImageResponse = {
  id: string;
  created_at: string;
  updated_at: string;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  downloads: number;
  likes: number;
  liked_by_user: boolean;
  description: string;
  exif: RandomImageExif;
  location: RandomImageLocation;
  current_user_collections: RandomImageCollection[];
  urls: RandomImageUrls;
  links: RandomImageLinks;
  user: RandomImageUser;
};

export interface RandomImageExif {
  make: string;
  model: string;
  exposure_time: string;
  aperture: string;
  focal_length: string;
  iso: number;
}

export interface RandomImageLocation {
  name: string;
  city: string;
  country: string;
  position: Position;
}

export interface Position {
  latitude: number;
  longitude: number;
}

export interface RandomImageCollection {
  id: number;
  title: string;
  published_at: string;
  last_collected_at: string;
  updated_at: string;
  cover_photo: any;
  user: any;
}

export interface RandomImageUrls {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
}

export interface RandomImageLinks {
  self: string;
  html: string;
  download: string;
  download_location: string;
}

export interface RandomImageUser {
  id: string;
  updated_at: string;
  username: string;
  name: string;
  portfolio_url: string;
  bio: string;
  location: string;
  total_likes: number;
  total_photos: number;
  total_collections: number;
  instagram_username: string;
  twitter_username: string;
  links: Links2;
}

export interface Links2 {
  self: string;
  html: string;
  photos: string;
  likes: string;
  portfolio: string;
}
