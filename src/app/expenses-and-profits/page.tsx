"use client";

import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { PROPERTIES } from "@/data/properties";
import {
  DollarSign,
  TrendingUp,
  Receipt,
  Plus,
  Filter,
  Download,
  Calendar,
  Building,
  CheckCircle2,
  Trash2,
  X,
  Upload,
  ArrowRight,
  PieChart,
  Tag,
  FileText
} from "lucide-react";

interface ExpenseItem {
  id: string;
  propertyId: string;
  propertyName: string;
  category: "Caretaker Salary" | "Electricity & Utilities" | "Cleaning & Housekeeping" | "Linen & Laundry" | "Repairs & Maintenance" | "Toiletries & Supplies" | "Society Maintenance";
  amount: number;
  date: string;
  payee: string;
  paymentMode: "UPI" | "Bank Transfer" | "Cash";
  receiptUploaded: boolean;
  notes?: string;
}

const INITIAL_EXPENSES: ExpenseItem[] = [
  {
    id: "EXP-101",
    propertyId: "LUL-101",
    propertyName: "The Luxe Haven (1BHK Flat)",
    category: "Caretaker Salary",
    amount: 8000,
    date: "2026-10-01",
    payee: "Ramesh Kumar (Caretaker)",
    paymentMode: "UPI",
    receiptUploaded: true,
    notes: "Monthly caretaker salary for October"
  },
  {
    id: "EXP-102",
    propertyId: "LUL-101",
    propertyName: "The Luxe Haven (1BHK Flat)",
    category: "Electricity & Utilities",
    amount: 3450,
    date: "2026-10-05",
    payee: "MVVNL Lucknow",
    paymentMode: "Bank Transfer",
    receiptUploaded: true,
    notes: "Electricity power bill - AC usage"
  },
  {
    id: "EXP-103",
    propertyId: "GOM-201",
    propertyName: "The Dark Blue Haven (2BHK Flat)",
    category: "Linen & Laundry",
    amount: 1800,
    date: "2026-10-12",
    payee: "Gomti Express Laundry",
    paymentMode: "UPI",
    receiptUploaded: true,
    notes: "Bed sheets, duvets and towels dry cleaning"
  },
  {
    id: "EXP-104",
    propertyId: "SHA-301",
    propertyName: "The Grand Haven Villa",
    category: "Toiletries & Supplies",
    amount: 2400,
    date: "2026-10-15",
    payee: "Metro Wholesale",
    paymentMode: "UPI",
    receiptUploaded: true,
    notes: "Premium shampoo, conditioner, dental kits and coffee pods"
  },
  {
    id: "EXP-105",
    propertyId: "LUL-102",
    propertyName: "The Elegant Haven (1BHK Flat)",
    category: "Repairs & Maintenance",
    amount: 1200,
    date: "2026-10-18",
    payee: "Local Plumber Service",
    paymentMode: "Cash",
    receiptUploaded: false,
    notes: "Bathroom geyser valve replacement"
  }
];

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<ExpenseItem[]>(INITIAL_EXPENSES);
  const [selectedPropFilter, setSelectedPropFilter] = useState("all");
  const [selectedCatFilter, setSelectedCatFilter] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Expense Form State
  const [propId, setPropId] = useState(PROPERTIES[0].id);
  const [category, setCategory] = useState<ExpenseItem["category"]>("Caretaker Salary");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("2026-10-26");
  const [payee, setPayee] = useState("");
  const [paymentMode, setPaymentMode] = useState<ExpenseItem["paymentMode"]>("UPI");
  const [notes, setNotes] = useState("");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredExpenses = useMemo(() => {
    return expenses.filter((e) => {
      if (selectedPropFilter !== "all" && e.propertyId !== selectedPropFilter) return false;
      if (selectedCatFilter !== "all" && e.category !== selectedCatFilter) return false;
      return true;
    });
  }, [expenses, selectedPropFilter, selectedCatFilter]);

  const totalGrossRevenue = 248500;
  const totalExpenses = useMemo(() => {
    return expenses.reduce((acc, curr) => acc + curr.amount, 0);
  }, [expenses]);
  const netOperatingIncome = totalGrossRevenue - totalExpenses;
  const profitMargin = Math.round((netOperatingIncome / totalGrossRevenue) * 100);

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(amount);
    if (!val || val <= 0) return;

    const prop = PROPERTIES.find((p) => p.id === propId) || PROPERTIES[0];
    const newItem: ExpenseItem = {
      id: `EXP-${Math.floor(100 + Math.random() * 900)}`,
      propertyId: prop.id,
      propertyName: `${prop.name} (${prop.type})`,
      category,
      amount: val,
      date,
      payee: payee || "Authorized Vendor",
      paymentMode,
      receiptUploaded: true,
      notes
    };

    setExpenses([newItem, ...expenses]);
    setShowAddModal(false);
    setAmount("");
    setPayee("");
    setNotes("");
    showToast(`Logged expense of ₹${val.toLocaleString()} under ${category}. P&L updated instantly!`);
  };

  const handleExportCSV = () => {
    const headers = "Expense ID,Property,Category,Amount,Date,Payee,Payment Mode,Notes\n";
    const rows = filteredExpenses
      .map(
        (e) =>
          `"${e.id}","${e.propertyName}","${e.category}",${e.amount},"${e.date}","${e.payee}","${e.paymentMode}","${e.notes || ""}"`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Homey_India_Expenses_${Date.now()}.csv`;
    a.click();
    showToast("Exported expenses CSV report.");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <Navbar />

      {/* Header */}
      <div className="bg-[#0f172a] text-white pt-24 pb-6 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Host Control Centre &bull; Homey India
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display flex items-center gap-3">
              Property Expenses &amp; True P&amp;L Ledger
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportCSV}
              className="px-4 py-2 rounded-xl bg-slate-800 text-white font-bold text-xs hover:bg-slate-700 transition border border-slate-700 flex items-center gap-1.5 shadow"
            >
              <Download className="w-4 h-4 text-emerald-400" /> Export CSV
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 rounded-xl bg-[#ff3823] text-white font-bold text-xs hover:bg-[#e5220d] transition shadow-lg shadow-[#ff3823]/20 flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Add New Expense
            </button>
          </div>
        </div>

        {/* Sub Nav */}
        <div className="max-w-7xl mx-auto mt-6 flex items-center gap-2 border-t border-slate-800/80 pt-4 overflow-x-auto text-sm font-medium">
          <Link href="/dashboard" className="px-4 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition">
            Dashboard
          </Link>
          <Link href="/calendar" className="px-4 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition">
            Calendar &amp; Pricing
          </Link>
          <Link href="/properties" className="px-4 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition">
            Properties ({PROPERTIES.length})
          </Link>
          <Link href="/reservations" className="px-4 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition">
            Reservations
          </Link>
          <Link href="/channel-manager" className="px-4 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition">
            Channel Manager
          </Link>
          <Link href="/expenses-and-profits" className="px-4 py-2 rounded-xl bg-[#ff3823] text-white font-bold shadow-lg shadow-[#ff3823]/20">
            Expenses &amp; True P&amp;L
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
        {toastMessage && (
          <div className="fixed top-24 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-in slide-in-from-top-4 duration-200">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="text-sm font-semibold">{toastMessage}</span>
          </div>
        )}

        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-1">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Gross Booking Revenue</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              ₹{totalGrossRevenue.toLocaleString()}
            </div>
            <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 pt-1">
              <TrendingUp className="w-3.5 h-3.5" /> +30.6% vs last month
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-1">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Operating Costs</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-rose-600 font-display">
              ₹{totalExpenses.toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-500 font-semibold pt-1">
              {Math.round((totalExpenses / totalGrossRevenue) * 100)}% of gross revenue
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-1">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Net Operating Income (NOI)</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-display">
              ₹{netOperatingIncome.toLocaleString()}
            </div>
            <div className="text-[11px] text-emerald-600 font-semibold pt-1">
              Real cash flow to owner account
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-1">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Operating Profit Margin</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600 font-display">
              {profitMargin}%
            </div>
            <div className="text-[11px] text-indigo-600 font-semibold pt-1">
              Top 5% among homestay portfolios
            </div>
          </div>
        </div>

        {/* Expenses Ledger & Filters */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 font-display">Expense Ledger</h2>
              <p className="text-xs text-slate-500 mt-0.5">Itemized operational costs with uploaded tax receipts.</p>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={selectedPropFilter}
                onChange={(e) => setSelectedPropFilter(e.target.value)}
                aria-label="Filter Expenses by Property"
                className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 shadow-sm outline-none"
              >
                <option value="all">All 18 Properties</option>
                {PROPERTIES.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>

              <select
                value={selectedCatFilter}
                onChange={(e) => setSelectedCatFilter(e.target.value)}
                aria-label="Filter Expenses by Category"
                className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 shadow-sm outline-none"
              >
                <option value="all">All Categories</option>
                <option value="Caretaker Salary">Caretaker Salary</option>
                <option value="Electricity & Utilities">Electricity &amp; Utilities</option>
                <option value="Cleaning & Housekeeping">Cleaning &amp; Housekeeping</option>
                <option value="Linen & Laundry">Linen &amp; Laundry</option>
                <option value="Toiletries & Supplies">Toiletries &amp; Supplies</option>
                <option value="Repairs & Maintenance">Repairs &amp; Maintenance</option>
              </select>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="py-4 px-6">ID &amp; Date</th>
                    <th className="py-4 px-6">Property</th>
                    <th className="py-4 px-6">Category</th>
                    <th className="py-4 px-6">Payee / Vendor</th>
                    <th className="py-4 px-6">Payment Mode</th>
                    <th className="py-4 px-6">Amount</th>
                    <th className="py-4 px-6 text-right">Receipt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredExpenses.map((e) => (
                    <tr key={e.id} className="hover:bg-slate-50/70 transition">
                      <td className="py-4 px-6">
                        <div className="font-mono font-bold text-slate-900">{e.id}</div>
                        <div className="text-[11px] text-slate-400">{e.date}</div>
                      </td>

                      <td className="py-4 px-6 font-semibold text-slate-900 max-w-[200px] truncate">
                        {e.propertyName}
                      </td>

                      <td className="py-4 px-6">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                          {e.category}
                        </span>
                      </td>

                      <td className="py-4 px-6">
                        <div className="font-semibold text-slate-900">{e.payee}</div>
                        {e.notes && <div className="text-[10px] text-slate-400 truncate max-w-[180px]">{e.notes}</div>}
                      </td>

                      <td className="py-4 px-6 font-medium text-slate-600">
                        {e.paymentMode}
                      </td>

                      <td className="py-4 px-6 font-extrabold text-slate-900 text-sm">
                        ₹{e.amount.toLocaleString()}
                      </td>

                      <td className="py-4 px-6 text-right">
                        {e.receiptUploaded ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Verified Bill
                          </span>
                        ) : (
                          <span className="text-[11px] text-slate-400">No Receipt</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* ADD EXPENSE MODAL  */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <form
            onSubmit={handleAddExpense}
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 animate-in zoom-in-95 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-xl font-bold text-slate-900 font-display">Record Property Expense</h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Select Property *</label>
                <select
                  value={propId}
                  onChange={(e) => setPropId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold bg-white"
                >
                  {PROPERTIES.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.type})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Expense Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold bg-white"
                >
                  <option value="Caretaker Salary">Caretaker Salary / Staff</option>
                  <option value="Electricity & Utilities">Electricity &amp; Power Bill</option>
                  <option value="Cleaning & Housekeeping">Deep Cleaning &amp; Housekeeping</option>
                  <option value="Linen & Laundry">Linen &amp; Towel Laundry</option>
                  <option value="Toiletries & Supplies">Toiletries &amp; Guest Supplies</option>
                  <option value="Repairs & Maintenance">Repairs &amp; Maintenance</option>
                  <option value="Society Maintenance">Society Maintenance Charges</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Amount (₹) *</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 3500"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-extrabold text-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Date *</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Payee / Vendor Name</label>
                  <input
                    type="text"
                    placeholder="e.g. MVVNL Electricity / Caretaker"
                    value={payee}
                    onChange={(e) => setPayee(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Payment Mode</label>
                  <select
                    value={paymentMode}
                    onChange={(e) => setPaymentMode(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold bg-white"
                  >
                    <option value="UPI">UPI (GPay / PhonePe / Paytm)</option>
                    <option value="Bank Transfer">Bank Transfer (NEFT/IMPS)</option>
                    <option value="Cash">Cash</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Notes / Description</label>
                <input
                  type="text"
                  placeholder="Optional detail or invoice number"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold"
                />
              </div>

              <div className="p-3 rounded-2xl border-2 border-dashed border-slate-200 hover:border-[#ff3823] cursor-pointer text-center text-slate-500 hover:text-[#ff3823] transition">
                <Upload className="w-5 h-5 mx-auto mb-1" />
                <span className="text-[11px] font-bold">Upload Tax Invoice / Bill Receipt (PNG, PDF)</span>
              </div>
            </div>

            <div className="mt-4 flex gap-3">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 font-bold text-xs text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl bg-[#ff3823] text-white font-bold text-xs hover:bg-[#e5220d] shadow"
              >
                Save Expense
              </button>
            </div>
          </form>
        </div>
      )}

      <Footer />
    </div>
  );
}
