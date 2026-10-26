"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Building,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Upload,
  Camera,
  MapPin,
  Sparkles,
  ShieldCheck,
  Check,
  Tag,
  DollarSign,
  Bed,
  Bath,
  Users,
  Home,
  Waves,
  Trees,
  Award
} from "lucide-react";

export default function CreateListingWizard() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const totalSteps = 8;
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State
  const [propertyType, setPropertyType] = useState("Villa");
  const [hostRole, setHostRole] = useState("Property Owner");
  const [companyName, setCompanyName] = useState("The Unique Haven Homes Private Limited");
  const [hostEmail, setHostEmail] = useState("theuniquehavenhomes@gmail.com");

  const [title, setTitle] = useState("");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [flatNo, setFlatNo] = useState("");
  const [landmark, setLandmark] = useState("Near Lulu Mall / Ekana Stadium");
  const [city, setCity] = useState("Lucknow");
  const [pincode, setPincode] = useState("226010");
  const [state, setState] = useState("Uttar Pradesh");

  const [guests, setGuests] = useState(4);
  const [bedrooms, setBedrooms] = useState(2);
  const [beds, setBeds] = useState(2);
  const [bathrooms, setBathrooms] = useState(2);

  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([
    "High-Speed Wifi",
    "Air Conditioning",
    "Smart TV",
    "Modular Kitchen",
    "Free Parking",
    "Power Backup"
  ]);

  const [price, setPrice] = useState(3500);
  const [weekendPrice, setWeekendPrice] = useState(4200);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const propertyTypes = [
    { name: "Villa", icon: Home, desc: "Independent luxury home" },
    { name: "Apartment", icon: Building, desc: "High-rise luxury flat" },
    { name: "Unique Stay", icon: Sparkles, desc: "Penthouse / Heritage" },
    { name: "Farm House", icon: Trees, desc: "Scenic rural retreat" },
    { name: "Boutique Suite", icon: Award, desc: "Hotel style suite" },
    { name: "Pool Stay", icon: Waves, desc: "Private pool villa" }
  ];

  const allAmenitiesList = [
    "High-Speed Wifi",
    "Air Conditioning",
    "Smart TV",
    "Modular Kitchen",
    "Free Parking",
    "Power Backup",
    "Swimming Pool",
    "Geyser / Hot Water",
    "Washing Machine",
    "Balcony Views",
    "24/7 Security",
    "Elevator"
  ];

  const handlePublish = () => {
    showToast("Publishing listing to Homey India direct website and generating 2-way iCal sync...");
    setTimeout(() => {
      router.push("/properties");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <Navbar />

      {/* Progress Header */}
      <div className="bg-[#0f172a] text-white pt-24 pb-6 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/properties" className="text-slate-400 hover:text-white text-xs font-semibold flex items-center gap-1">
            <ChevronLeft className="w-4 h-4" /> Cancel &amp; Back to Properties
          </Link>

          <div className="text-xs font-semibold text-slate-400">
            Step <span className="text-white font-bold">{step}</span> of {totalSteps}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="max-w-4xl mx-auto mt-4 bg-slate-800 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-[#ff3823] h-full transition-all duration-300"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Wizard Form Container */}
      <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {toastMessage && (
          <div className="fixed top-24 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-in slide-in-from-top-4 duration-200">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="text-sm font-semibold">{toastMessage}</span>
          </div>
        )}

        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
          {/* STEP 1: HOST STANDARDS AGREEMENT */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <span className="px-3 py-1 rounded-full bg-[#ff3823]/10 text-[#ff3823] font-bold text-xs uppercase tracking-wider">
                  Homey India Quality Benchmark
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-2">
                  Partner Guidelines &amp; Price Parity Commitment
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Ensures a smooth onboarding process, superior guest experience, and zero commission leakages.
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                  <div className="font-bold text-slate-900 text-sm">1. Property Quality &amp; Hygiene Standards</div>
                  <p className="text-xs text-slate-600">
                    Your property must comply with clean linen, fresh bathroom amenities, working air-conditioning, and 100% verified photography.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                  <div className="font-bold text-slate-900 text-sm">2. Transparent Zero Guest Booking Fees</div>
                  <p className="text-xs text-slate-600">
                    Homey India charges 0% guest service fee. Guests always get the best rate directly on your branded portal.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                  <div className="font-bold text-slate-900 text-sm">3. Real-Time Calendar Sync</div>
                  <p className="text-xs text-slate-600">
                    Commit to 2-way automated iCal sync with Airbnb, Booking.com, and OTAs to prevent double bookings.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: PROPERTY TYPE */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900 font-display">
                  Select Your Property Type
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Choose the category that best describes your property architecture.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {propertyTypes.map((pt) => {
                  const Icon = pt.icon;
                  const isSelected = propertyType === pt.name;
                  return (
                    <button
                      key={pt.name}
                      type="button"
                      onClick={() => setPropertyType(pt.name)}
                      className={`p-5 rounded-2xl border text-left transition flex flex-col justify-between h-36 ${
                        isSelected
                          ? "border-[#ff3823] bg-[#fff1ef] ring-2 ring-[#ff3823]/20 shadow-md"
                          : "border-slate-200 hover:border-slate-300 bg-white"
                      }`}
                    >
                      <Icon className={`w-6 h-6 ${isSelected ? "text-[#ff3823]" : "text-slate-600"}`} />
                      <div>
                        <div className="font-bold text-slate-900 text-sm">{pt.name}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5">{pt.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: HOST IDENTITY */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900 font-display">
                  Are You a Property Owner or Manager?
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Select your role and organization details for tax invoices and guest communication.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {["Property Owner", "Property Manager", "Hotel Operator", "Authorized Agent"].map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setHostRole(role)}
                    className={`p-4 rounded-2xl border text-center font-bold text-xs transition ${
                      hostRole === role
                        ? "border-[#ff3823] bg-[#fff1ef] text-[#ff3823] ring-2 ring-[#ff3823]/20"
                        : "border-slate-200 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>

              <div className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Company / Organization Name
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Contact Email ID
                  </label>
                  <input
                    type="email"
                    value={hostEmail}
                    onChange={(e) => setHostEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: LOCATION */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900 font-display">
                  Where is Your Property Located?
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Exact house and flat number will only be shared with guests after a confirmed reservation.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    House / Flat No. and Building Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Flat 1102, Tower B, Omaxe Heights"
                    value={flatNo}
                    onChange={(e) => setFlatNo(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Nearby Landmark
                  </label>
                  <input
                    type="text"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      City *
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Pincode *
                    </label>
                    <input
                      type="text"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      State *
                    </label>
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: CAPACITY */}
          {step === 5 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900 font-display">
                  Guest Capacity &amp; Room Layout
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Specify how many guests can stay comfortably.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
                  <div className="text-xs font-bold text-slate-500 uppercase">Guests</div>
                  <div className="text-3xl font-extrabold text-slate-900 my-2">{guests}</div>
                  <div className="flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                      className="w-8 h-8 rounded-lg bg-white border border-slate-200 font-bold"
                    >
                      -
                    </button>
                    <button
                      type="button"
                      onClick={() => setGuests(guests + 1)}
                      className="w-8 h-8 rounded-lg bg-white border border-slate-200 font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
                  <div className="text-xs font-bold text-slate-500 uppercase">Bedrooms</div>
                  <div className="text-3xl font-extrabold text-slate-900 my-2">{bedrooms}</div>
                  <div className="flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => setBedrooms(Math.max(1, bedrooms - 1))}
                      className="w-8 h-8 rounded-lg bg-white border border-slate-200 font-bold"
                    >
                      -
                    </button>
                    <button
                      type="button"
                      onClick={() => setBedrooms(bedrooms + 1)}
                      className="w-8 h-8 rounded-lg bg-white border border-slate-200 font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
                  <div className="text-xs font-bold text-slate-500 uppercase">Beds</div>
                  <div className="text-3xl font-extrabold text-slate-900 my-2">{beds}</div>
                  <div className="flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => setBeds(Math.max(1, beds - 1))}
                      className="w-8 h-8 rounded-lg bg-white border border-slate-200 font-bold"
                    >
                      -
                    </button>
                    <button
                      type="button"
                      onClick={() => setBeds(beds + 1)}
                      className="w-8 h-8 rounded-lg bg-white border border-slate-200 font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
                  <div className="text-xs font-bold text-slate-500 uppercase">Bathrooms</div>
                  <div className="text-3xl font-extrabold text-slate-900 my-2">{bathrooms}</div>
                  <div className="flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => setBathrooms(Math.max(1, bathrooms - 1))}
                      className="w-8 h-8 rounded-lg bg-white border border-slate-200 font-bold"
                    >
                      -
                    </button>
                    <button
                      type="button"
                      onClick={() => setBathrooms(bathrooms + 1)}
                      className="w-8 h-8 rounded-lg bg-white border border-slate-200 font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: AMENITIES */}
          {step === 6 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900 font-display">
                  Select Amenities
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Highlight what makes your property stand out.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {allAmenitiesList.map((amenity) => {
                  const isChecked = selectedAmenities.includes(amenity);
                  return (
                    <label
                      key={amenity}
                      className={`p-3.5 rounded-2xl border text-xs font-bold cursor-pointer transition flex items-center gap-2.5 ${
                        isChecked
                          ? "border-[#ff3823] bg-[#fff1ef] text-[#ff3823]"
                          : "border-slate-200 text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => {
                          if (e.target.checked) setSelectedAmenities([...selectedAmenities, amenity]);
                          else setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity));
                        }}
                        className="rounded text-[#ff3823] focus:ring-[#ff3823]"
                      />
                      <span>{amenity}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 7: TITLE & DESCRIPTION */}
          {step === 7 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900 font-display">
                  Give Your Listing a Catchy Title
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Short, descriptive titles that mention key highlights attract the highest CTR.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Listing Title *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. The Royal Gomti Luxury Villa with Private Pool"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Subtitle / Tagline
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 3BHK Private Luxury Homestay near Lulu Mall & Ekana"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Full Description
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe your space, ambiance, kitchen setup, view and host hospitality..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 8: PRICING & PUBLISH */}
          {step === 8 && (
            <div className="space-y-6">
              <div>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs uppercase tracking-wider border border-emerald-200">
                  Final Step
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-2">
                  Set Your Nightly Pricing &amp; Publish
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  You can fine-tune discounts, weekend surcharges, and iCal sync at any time in Calendar settings.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Weekday Nightly Rate (Sun &ndash; Thu)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-lg">₹</span>
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(parseInt(e.target.value) || 0)}
                      className="w-full pl-9 pr-4 py-3 rounded-xl border border-slate-200 text-xl font-extrabold text-slate-900"
                    />
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Weekend Nightly Rate (Fri &ndash; Sat)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-lg">₹</span>
                    <input
                      type="number"
                      value={weekendPrice}
                      onChange={(e) => setWeekendPrice(parseInt(e.target.value) || 0)}
                      className="w-full pl-9 pr-4 py-3 rounded-xl border border-slate-200 text-xl font-extrabold text-slate-900"
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-3 text-xs text-emerald-800">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>
                  <strong>Zero Platform Commission on Direct Bookings:</strong> You take home 100% of direct bookings while keeping your Airbnb &amp; Booking.com channels seamlessly synced.
                </span>
              </div>
            </div>
          )}

          {/* Footer Controls */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 font-bold text-xs text-slate-600 hover:bg-slate-50 flex items-center gap-1.5"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
            ) : (
              <div></div>
            )}

            {step < totalSteps ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition flex items-center gap-1.5 shadow"
              >
                Continue <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handlePublish}
                className="px-8 py-3 rounded-xl bg-[#ff3823] text-white font-bold text-sm hover:bg-[#e5220d] transition shadow-xl shadow-[#ff3823]/25 flex items-center gap-2"
              >
                <Check className="w-5 h-5" /> Publish Listing Now
              </button>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
