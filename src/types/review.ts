export type RatingValue = 1 | 2 | 3 | 4 | 5;

export type ReviewFormData = {
  shopName: string;
  softcreamType: string;
  price: string;
  eatenOn: string;
  imageDataUrl?: string;
  imageName?: string;
  imageType?: string;
  milkRichness: RatingValue;
  smoothness: RatingValue;
  sweetnessBalance: RatingValue;
  valueVolume: RatingValue;
  uniqueness: RatingValue;
  overallSatisfaction: RatingValue;
};

export type Profile = {
  id: string;
  nickname: string;
  created_at: string;
};

export type Review = {
  id: string;
  profile_id: string;
  shop_name: string;
  softcream_type: string;
  price: number;
  image_url: string | null;
  eaten_on: string;
  milk_richness: number;
  smoothness: number;
  sweetness_balance: number;
  value_volume: number;
  uniqueness: number;
  overall_satisfaction: number;
  created_at: string;
};
