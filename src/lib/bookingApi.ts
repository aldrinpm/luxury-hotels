import { ROOMS } from "../data/rooms";
import { nightsBetween } from "./dates";

export type BookingRequest = {
  roomId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  name: string;
  email: string;
  requests?: string;
};

export type BookingConfirmation = {
  reference: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  nights: number;
  total: number;
  name: string;
};

export type InquiryRequest = {
  name: string;
  email: string;
  message: string;
};

const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

/**
 * Frontend-only reservation stub. Replace the body with a POST to
 * /api/bookings when the backend exists — the signature stays the same.
 */
export async function createBooking(request: BookingRequest): Promise<BookingConfirmation> {
  await delay(650);
  const room = ROOMS.find((r) => r.id === request.roomId) ?? ROOMS[0];
  const nights = Math.max(1, nightsBetween(request.checkIn, request.checkOut));
  return {
    reference: `KB-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
    roomName: room.name,
    checkIn: request.checkIn,
    checkOut: request.checkOut,
    guests: request.guests,
    nights,
    total: nights * room.price,
    name: request.name,
  };
}

/**
 * Frontend-only inquiry stub. Replace with a POST to /api/inquiries when the
 * backend exists — the signature stays the same.
 */
export async function sendInquiry(request: InquiryRequest): Promise<void> {
  void request; /* nothing is sent anywhere from a static build */
  await delay(500);
}
