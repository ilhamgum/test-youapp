export interface UserProps {
  image?: string;
  name: string;
  gender: string;
  birthday: string;
  horoscope: string;
  zodiac: string;
  height: number;
  weight: number;
  interest?: InterestProps[];
}

export interface InterestProps {
  label: string;
  value: string;
}
