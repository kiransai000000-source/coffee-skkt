import React, { useState } from 'react';
import {
  Calendar,
  Users,
  Clock,
  Sparkles,
  CheckCircle2,
  MapPin,
  MessageSquare,
  Copy,
  Download,
  ChevronRight,
  ChevronLeft,
  Coffee,
  Check,
  AlertCircle
} from 'lucide-react';
import { SEATING_AREAS, TIME_SLOTS } from '../data/coffeeData';
import { BookingRequest, SeatingAreaId } from '../types';

interface BookingSectionProps {
  onBookingCreated: (booking: BookingRequest) => void;
  onViewReservations: () => void;
}

export const BookingSection: React.FC<BookingSectionProps> = ({
  onBookingCreated,
  onViewReservations,
}) => {
  // Step state (1: Guests & Date, 2: Seating Area, 3: Time Slot, 4: Guest Info, 5: Confirmed)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form state
  const [partySize, setPartySize] = useState<number>(2);

  // Date setup (default today)
  const todayStr = new Date().toISOString().split('T')[0];
  const tomorrowObj = new Date();
  tomorrowObj.setDate(tomorrowObj.getDate() + 1);
  const tomorrowStr = tomorrowObj.toISOString().split('T')[0];

  const [selectedDate, setSelectedDate] = useState<string>(todayStr);
  const [selectedSeatingId, setSelectedSeatingId] = useState<SeatingAreaId>('window_nook');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('09:30 AM');

  const [guestName, setGuestName] = useState<string>('');
  const [guestEmail, setGuestEmail] = useState<string>('');
  const [guestPhone, setGuestPhone] = useState<string>('');
  const [occasion, setOccasion] = useState<string>('Casual Catch-up');
  const [specialNotes, setSpecialNotes] = useState<string>('');

  const [confirmedBooking, setConfirmedBooking] = useState<BookingRequest | null>(null);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const selectedSeatingArea = SEATING_AREAS.find((a) => a.id === selectedSeatingId) || SEATING_AREAS[0];

  const validateGuestInfo = () => {
    const errs: { [key: string]: string } = {};
    if (!guestName.trim()) errs.name = 'Full name is required';
    if (!guestEmail.trim() || !guestEmail.includes('@')) errs.email = 'Valid email is required';
    if (!guestPhone.trim() || guestPhone.length < 7) errs.phone = 'Valid phone number is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateGuestInfo()) return;

    const refCode = 'ART-' + Math.floor(1000 + Math.random() * 9000);
    const newBooking: BookingRequest = {
      id: 'bk_' + Date.now(),
      referenceCode: refCode,
      partySize,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      seatingAreaId: selectedSeatingId,
      seatingAreaName: selectedSeatingArea.name,
      guestName: guestName.trim(),
      guestEmail: guestEmail.trim(),
      guestPhone: guestPhone.trim(),
      specialNotes: specialNotes.trim(),
      occasion,
      createdAt: new Date().toISOString(),
      status: 'confirmed',
    };

    onBookingCreated(newBooking);
    setConfirmedBooking(newBooking);
    setCurrentStep(5);
  };

  const handleCopyCode = () => {
    if (confirmedBooking) {
      navigator.clipboard.writeText(confirmedBooking.referenceCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const handleDownloadCalendar = () => {
    if (!confirmedBooking) return;
    const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Artisan Coffee House//Table Booking//EN
BEGIN:VEVENT
SUMMARY:Table Reservation at Artisan Coffee House (${confirmedBooking.referenceCode})
DESCRIPTION:Table for ${confirmedBooking.partySize} at ${confirmedBooking.seatingAreaName}.
LOCATION:428 Timberland Avenue, Historic Roastery District, CA 94107
DTSTART:${confirmedBooking.date.replace(/-/g, '')}T090000Z
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `artisan-coffee-booking-${confirmedBooking.referenceCode}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetBookingForm = () => {
    setCurrentStep(1);
    setConfirmedBooking(null);
    setGuestName('');
    setGuestEmail('');
    setGuestPhone('');
    setSpecialNotes('');
  };

  return (
    <section id="booking" className="py-20 text-left relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <span className="text-xs font-semibold tracking-widest text-[#F59E0B] uppercase px-3 py-1 rounded-full bg-white/10 border border-white/15 backdrop-blur-md inline-block">
            Seamless Table Reservation
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#FDFBF7]">
            Reserve Your Perfect Seat
          </h2>
          <p className="text-sm text-stone-300">
            Book a cozy window nook, quiet work booth, or outdoor patio table in just a few clicks. No waiting in line.
          </p>
        </div>

        {/* Stepper Progress Indicator */}
        {currentStep <= 4 && (
          <div className="mb-8 max-w-3xl mx-auto px-2">
            <div className="flex items-center justify-between text-xs font-semibold text-stone-300">
              {[
                { step: 1, label: 'Guests & Date' },
                { step: 2, label: 'Seating Zone' },
                { step: 3, label: 'Time Slot' },
                { step: 4, label: 'Your Info' },
              ].map((s) => (
                <div key={s.step} className="flex items-center gap-2">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      currentStep === s.step
                        ? 'bg-[#D97706] text-white ring-4 ring-[#D97706]/30 shadow-md border border-white/20'
                        : currentStep > s.step
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-white/5 text-stone-400 border border-white/10'
                    }`}
                  >
                    {currentStep > s.step ? <Check className="w-3.5 h-3.5" /> : s.step}
                  </div>
                  <span className={currentStep === s.step ? 'text-white font-bold hidden sm:inline' : 'hidden sm:inline'}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
            <div className="w-full bg-white/5 h-2 rounded-full mt-3 overflow-hidden border border-white/10">
              <div
                className="bg-gradient-to-r from-[#D97706] to-[#C2410C] h-full transition-all duration-300"
                style={{ width: `${(currentStep / 4) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Form Container */}
        <div className="glass-panel rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-8">
          {/* STEP 1: Party Size & Date */}
          {currentStep === 1 && (
            <div className="space-y-8 animate-fade-in">
              <div>
                <h3 className="font-serif text-xl font-bold text-white mb-1 flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#F59E0B]" />
                  <span>How many guests?</span>
                </h3>
                <p className="text-xs text-stone-300 mb-4">
                  Select your party size to view matching seating areas.
                </p>

                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setPartySize(num)}
                      className={`py-3 rounded-xl border text-sm font-bold transition-all flex flex-col items-center gap-1 ${
                        partySize === num
                          ? 'bg-[#D97706] text-white border-white/30 shadow-lg shadow-[#D97706]/30'
                          : 'bg-white/5 text-stone-200 border-white/10 hover:border-amber-500/40 hover:bg-white/10'
                      }`}
                      id={`booking-party-${num}`}
                    >
                      <span>{num}</span>
                      <span className="text-[10px] font-normal opacity-80">
                        {num === 1 ? 'Guest' : 'Guests'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-white/10">
                <h3 className="font-serif text-xl font-bold text-white mb-1 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#F59E0B]" />
                  <span>Choose Date</span>
                </h3>
                <p className="text-xs text-stone-300 mb-4">
                  Select when you plan to visit us.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                  <button
                    type="button"
                    onClick={() => setSelectedDate(todayStr)}
                    className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all ${
                      selectedDate === todayStr
                        ? 'bg-amber-500/20 border-amber-500/50 text-white shadow-md'
                        : 'bg-white/5 border-white/10 text-stone-300 hover:border-white/20'
                    }`}
                  >
                    <span className="block text-white font-bold">Today</span>
                    <span className="text-[11px] text-stone-300">{todayStr}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedDate(tomorrowStr)}
                    className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all ${
                      selectedDate === tomorrowStr
                        ? 'bg-amber-500/20 border-amber-500/50 text-white shadow-md'
                        : 'bg-white/5 border-white/10 text-stone-300 hover:border-white/20'
                    }`}
                  >
                    <span className="block text-white font-bold">Tomorrow</span>
                    <span className="text-[11px] text-stone-300">{tomorrowStr}</span>
                  </button>

                  <div className="bg-black/30 border border-white/15 rounded-xl p-2.5 flex items-center">
                    <input
                      type="date"
                      min={todayStr}
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full bg-transparent text-xs text-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D97706] to-[#C2410C] text-white font-semibold text-sm shadow-lg border border-white/20 hover:shadow-xl hover:shadow-[#D97706]/30 transition-all flex items-center gap-2"
                  id="booking-step1-next"
                >
                  <span>Select Seating Area</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Seating Area Selector */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h3 className="font-serif text-xl font-bold text-white mb-1">
                  Choose Seating Ambience
                </h3>
                <p className="text-xs text-stone-300">
                  Showing options suitable for {partySize} {partySize === 1 ? 'guest' : 'guests'} on {selectedDate}.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SEATING_AREAS.map((area) => {
                  const isSelected = selectedSeatingId === area.id;
                  const isSuitable = area.maxPartySize >= partySize;

                  return (
                    <div
                      key={area.id}
                      onClick={() => isSuitable && setSelectedSeatingId(area.id)}
                      className={`relative rounded-2xl border overflow-hidden p-4 transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-white/15 border-amber-500/80 ring-2 ring-amber-500/30 shadow-xl backdrop-blur-xl'
                          : isSuitable
                          ? 'glass-card glass-card-hover'
                          : 'bg-white/5 border-white/5 opacity-40 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex gap-4">
                        <img
                          src={area.image}
                          alt={area.name}
                          className="w-24 h-24 rounded-xl object-cover shrink-0 border border-white/10"
                          referrerPolicy="no-referrer"
                        />
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-serif font-bold text-white text-base">{area.name}</h4>
                            {isSelected && (
                              <span className="bg-[#D97706] text-white p-1 rounded-full text-xs shadow-md">
                                <Check className="w-3.5 h-3.5" />
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-stone-300 line-clamp-2 leading-relaxed">
                            {area.description}
                          </p>
                          <span className="inline-block text-[10px] text-[#F59E0B] font-semibold bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded-md">
                            Best for: {area.recommendedFor}
                          </span>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-stone-300">
                        <span>Max {area.maxPartySize} Guests</span>
                        <span className="text-stone-300 truncate max-w-[200px]">
                          {area.features.slice(0, 2).join(' • ')}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-stone-200 text-xs font-semibold hover:bg-white/15 hover:text-white flex items-center gap-1.5"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D97706] to-[#C2410C] text-white font-semibold text-sm border border-white/20 hover:shadow-lg transition-all flex items-center gap-2"
                  id="booking-step2-next"
                >
                  <span>Select Time Slot</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Time Slot Selector */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h3 className="font-serif text-xl font-bold text-white mb-1">
                  Select Reservation Time
                </h3>
                <p className="text-xs text-stone-300">
                  Available slots for {selectedSeatingArea.name} on {selectedDate}.
                </p>
              </div>

              {/* Time Slots Groups */}
              {['Morning', 'Afternoon', 'Evening'].map((period) => {
                const slots = TIME_SLOTS.filter((s) => s.period === period);
                return (
                  <div key={period} className="space-y-2">
                    <h4 className="text-xs font-bold text-[#F59E0B] uppercase tracking-wider">
                      {period}
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2.5">
                      {slots.map((slot) => {
                        const isSelected = selectedTimeSlot === slot.time;
                        return (
                          <button
                            key={slot.time}
                            type="button"
                            onClick={() => setSelectedTimeSlot(slot.time)}
                            className={`p-3 rounded-xl border text-xs font-bold transition-all text-center flex flex-col items-center gap-1 ${
                              isSelected
                                ? 'bg-[#D97706] text-white border-white/30 shadow-lg shadow-[#D97706]/30'
                                : 'bg-white/5 text-stone-200 border-white/10 hover:border-amber-500/40 hover:bg-white/10'
                            }`}
                          >
                            <span>{slot.time}</span>
                            {slot.status === 'popular' && (
                              <span
                                className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium ${
                                  isSelected ? 'bg-black/30 text-white' : 'bg-amber-500/20 text-[#F59E0B] border border-amber-500/30'
                                }`}
                              >
                                Popular
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              <div className="pt-4 flex items-center justify-between border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-stone-200 text-xs font-semibold hover:bg-white/15 hover:text-white flex items-center gap-1.5"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentStep(4)}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D97706] to-[#C2410C] text-white font-semibold text-sm border border-white/20 hover:shadow-lg transition-all flex items-center gap-2"
                  id="booking-step3-next"
                >
                  <span>Guest Details</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Guest Info Form */}
          {currentStep === 4 && (
            <form onSubmit={handleConfirmBooking} className="space-y-6 animate-fade-in">
              <div>
                <h3 className="font-serif text-xl font-bold text-white mb-1">
                  Complete Your Reservation
                </h3>
                <p className="text-xs text-stone-300">
                  We will hold your table for up to 15 minutes past the reservation time.
                </p>
              </div>

              {/* Reservation Summary Box */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs backdrop-blur-md">
                <div>
                  <span className="text-stone-400 block">Party Size</span>
                  <span className="font-bold text-white">{partySize} Guests</span>
                </div>
                <div>
                  <span className="text-stone-400 block">Date</span>
                  <span className="font-bold text-white">{selectedDate}</span>
                </div>
                <div>
                  <span className="text-stone-400 block">Time</span>
                  <span className="font-bold text-[#F59E0B]">{selectedTimeSlot}</span>
                </div>
                <div>
                  <span className="text-stone-400 block">Seating Area</span>
                  <span className="font-bold text-white truncate block">{selectedSeatingArea.name}</span>
                </div>
              </div>

              {/* Input Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="e.g. Alex Morgan"
                    className="w-full px-3.5 py-2.5 glass-input rounded-xl text-xs text-white placeholder-stone-400 focus:outline-none"
                    id="guest-name-input"
                  />
                  {errors.name && <p className="text-[11px] text-red-400 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    placeholder="e.g. alex@example.com"
                    className="w-full px-3.5 py-2.5 glass-input rounded-xl text-xs text-white placeholder-stone-400 focus:outline-none"
                    id="guest-email-input"
                  />
                  {errors.email && <p className="text-[11px] text-red-400 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Phone Number <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="tel"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    placeholder="e.g. (415) 555-0199"
                    className="w-full px-3.5 py-2.5 glass-input rounded-xl text-xs text-white placeholder-stone-400 focus:outline-none"
                    id="guest-phone-input"
                  />
                  {errors.phone && <p className="text-[11px] text-red-400 mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Occasion / Type
                  </label>
                  <select
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className="w-full px-3.5 py-2.5 glass-input rounded-xl text-xs text-white focus:outline-none"
                  >
                    <option value="Casual Catch-up" className="bg-stone-900 text-white">Casual Catch-up</option>
                    <option value="Work / Remote Study" className="bg-stone-900 text-white">Work / Remote Study</option>
                    <option value="Birthday Celebration" className="bg-stone-900 text-white">Birthday Celebration</option>
                    <option value="Anniversary / Date" className="bg-stone-900 text-white">Anniversary / Date</option>
                    <option value="Business Coffee" className="bg-stone-900 text-white">Business Coffee</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Special Requests / Dietary Notes (Optional)
                </label>
                <textarea
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  rows={2}
                  placeholder="e.g. High chair needed, quiet corner preferred, celebrating a promotion..."
                  className="w-full px-3.5 py-2 glass-input rounded-xl text-xs text-white placeholder-stone-400 focus:outline-none"
                />
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-stone-200 text-xs font-semibold hover:bg-white/15 hover:text-white flex items-center gap-1.5"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#D97706] to-[#C2410C] text-white font-bold text-sm border border-white/20 shadow-xl shadow-[#D97706]/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
                  id="booking-confirm-submit-btn"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Confirm Table Booking</span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 5: Instant Confirmation Screen */}
          {currentStep === 5 && confirmedBooking && (
            <div className="space-y-6 text-center animate-fade-in">
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-500/10 border border-emerald-500/30">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-[#F59E0B] uppercase tracking-widest px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 inline-block">
                  Reservation Confirmed!
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  We Can'Wait to Serve You
                </h3>
                <p className="text-xs text-stone-300 max-w-md mx-auto">
                  A confirmation email has been dispatched to <span className="text-white font-semibold">{confirmedBooking.guestEmail}</span>.
                </p>
              </div>

              {/* Reference Code Card */}
              <div className="bg-white/5 border border-white/15 rounded-2xl p-6 max-w-lg mx-auto space-y-4 backdrop-blur-md shadow-xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-3 text-xs">
                  <span className="text-stone-400">Booking Code:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-base font-bold text-[#F59E0B]">
                      {confirmedBooking.referenceCode}
                    </span>
                    <button
                      onClick={handleCopyCode}
                      className="p-1 rounded bg-white/10 text-stone-200 hover:text-white border border-white/10"
                      title="Copy Code"
                    >
                      {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-left text-xs">
                  <div>
                    <span className="text-stone-400 block">Guest Name</span>
                    <span className="font-bold text-white">{confirmedBooking.guestName}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block">Party Size</span>
                    <span className="font-bold text-white">{confirmedBooking.partySize} Guests</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block">Date & Time</span>
                    <span className="font-bold text-[#F59E0B]">
                      {confirmedBooking.date} • {confirmedBooking.timeSlot}
                    </span>
                  </div>
                  <div>
                    <span className="text-stone-400 block">Seating Area</span>
                    <span className="font-bold text-white">{confirmedBooking.seatingAreaName}</span>
                  </div>
                </div>

                {confirmedBooking.specialNotes && (
                  <div className="text-left text-xs bg-black/30 p-3 rounded-xl border border-white/10">
                    <span className="text-stone-400 block font-semibold mb-0.5">Special Request:</span>
                    <p className="text-stone-300 italic">{confirmedBooking.specialNotes}</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleDownloadCalendar}
                  className="px-5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-xs font-semibold hover:bg-white/20 transition-all flex items-center gap-2 shadow-sm"
                  id="download-cal-btn"
                >
                  <Download className="w-4 h-4 text-[#F59E0B]" />
                  <span>Add to Calendar (.ics)</span>
                </button>

                <button
                  onClick={onViewReservations}
                  className="px-5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-xs font-semibold hover:bg-white/20 transition-all shadow-sm"
                >
                  <span>View All My Bookings</span>
                </button>

                <button
                  onClick={resetBookingForm}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D97706] to-[#C2410C] text-white text-xs font-semibold border border-white/20 shadow-lg hover:shadow-[#D97706]/30 transition-all"
                >
                  <span>Book Another Table</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
