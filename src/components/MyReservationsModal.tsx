import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, Users, Trash2, Search, Check, Copy } from 'lucide-react';
import { BookingRequest } from '../types';

interface MyReservationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: BookingRequest[];
  onCancelBooking: (bookingId: string) => void;
}

export const MyReservationsModal: React.FC<MyReservationsModalProps> = ({
  isOpen,
  onClose,
  bookings,
  onCancelBooking,
}) => {
  if (!isOpen) return null;

  const [searchRef, setSearchRef] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const activeBookings = bookings.filter((b) => b.status === 'confirmed');
  const filteredBookings = activeBookings.filter(
    (b) =>
      b.referenceCode.toLowerCase().includes(searchRef.toLowerCase()) ||
      b.guestName.toLowerCase().includes(searchRef.toLowerCase()) ||
      b.seatingAreaName.toLowerCase().includes(searchRef.toLowerCase())
  );

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(code);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl glass-modal rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-white/5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-[#F59E0B]">
              <Calendar className="w-5 h-5" />
            </div>
            <div className="text-left">
              <h3 className="font-serif text-lg font-bold text-white">Your Reserved Tables</h3>
              <p className="text-xs text-stone-300">
                Manage or review active table reservations
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 text-stone-300 hover:text-white hover:bg-white/20 transition-all border border-white/10"
            id="reservations-modal-close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 overflow-y-auto flex-1 text-left">
          {/* Search Bar */}
          {activeBookings.length > 0 && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                value={searchRef}
                onChange={(e) => setSearchRef(e.target.value)}
                placeholder="Search by code or guest name..."
                className="w-full pl-9 pr-4 py-2 glass-input rounded-xl text-xs text-white placeholder-stone-400 focus:outline-none"
              />
            </div>
          )}

          {filteredBookings.length === 0 ? (
            <div className="text-center py-12 space-y-3 bg-white/5 rounded-2xl border border-white/10 p-6">
              <Calendar className="w-10 h-10 text-stone-400 mx-auto" />
              <p className="text-sm font-semibold text-white">No active reservations found</p>
              <p className="text-xs text-stone-300 max-w-sm mx-auto">
                {searchRef
                  ? 'No booking matches your search query.'
                  : 'You currently have no table reservations. Click "Book a Table" to choose a date and seat.'}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredBookings.map((b) => (
                <div
                  key={b.id}
                  className="glass-card rounded-xl p-4 space-y-3 hover:border-amber-500/50 transition-all"
                >
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-stone-400">Code:</span>
                      <span className="font-mono text-sm font-bold text-[#F59E0B]">
                        {b.referenceCode}
                      </span>
                      <button
                        onClick={() => handleCopy(b.referenceCode)}
                        className="p-1 rounded text-stone-300 hover:text-white"
                        title="Copy Code"
                      >
                        {copiedId === b.referenceCode ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </div>

                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                      Confirmed
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    <div>
                      <span className="text-stone-400 block">Guest</span>
                      <span className="font-semibold text-white truncate block">{b.guestName}</span>
                    </div>

                    <div>
                      <span className="text-stone-400 block">Date & Time</span>
                      <span className="font-semibold text-white">
                        {b.date} @ {b.timeSlot}
                      </span>
                    </div>

                    <div>
                      <span className="text-stone-400 block">Party</span>
                      <span className="font-semibold text-white">{b.partySize} Guests</span>
                    </div>

                    <div>
                      <span className="text-stone-400 block">Zone</span>
                      <span className="font-semibold text-[#F59E0B] truncate block">
                        {b.seatingAreaName}
                      </span>
                    </div>
                  </div>

                  {b.specialNotes && (
                    <p className="text-[11px] text-stone-300 bg-black/30 p-2 rounded-lg italic border border-white/5">
                      Note: {b.specialNotes}
                    </p>
                  )}

                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => onCancelBooking(b.id)}
                      className="px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs hover:bg-red-500/20 transition-all flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Cancel Reservation</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
