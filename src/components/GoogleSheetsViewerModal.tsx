import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  TableProperties,
  Download,
  RefreshCw,
  Search,
  CheckCircle2,
  ExternalLink,
  X,
  FileSpreadsheet,
  Send,
  SlidersHorizontal,
  Flame,
  Filter,
  Lock,
  ShieldCheck
} from 'lucide-react';

export const GoogleSheetsViewerModal: React.FC = () => {
  const {
    showSheetsViewer,
    setShowSheetsViewer,
    customersSheet,
    subscriptionsSheet,
    kitchenLogsSheet,
    financialsSheet,
    updateKitchenLogStatus,
    webhookUrl,
    setWebhookUrl,
    lastWebhookSyncTime,
    triggerWebhookSync,
    isAdminLoggedIn,
    setIsAdminAuthModalOpen
  } = useApp();

  const [activeSheet, setActiveSheet] = useState<'customers' | 'subscriptions' | 'kitchen' | 'financials'>('kitchen');
  const [searchTerm, setSearchTerm] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncSuccessMessage, setSyncSuccessMessage] = useState<string | null>(null);

  if (!showSheetsViewer) return null;

  // Strict Security Check: Block access to customer master, subscriptions and financials for non-admins
  if (!isAdminLoggedIn) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-150">
        <div className="bg-[#FDFBF7] rounded-3xl max-w-md w-full shadow-2xl border border-slate-300 overflow-hidden relative p-6 text-center space-y-4">
          <button
            onClick={() => setShowSheetsViewer(false)}
            className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-14 h-14 bg-slate-900 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto shadow-md">
            <Lock className="w-7 h-7" />
          </div>

          <h3 className="text-xl font-bold font-display text-slate-900">
            Administrator Access Required
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            The Google Sheets database contains private customer profiles, phone numbers, delivery addresses, and financial balances. Please authenticate to access live spreadsheets.
          </p>

          <div className="pt-2 space-y-2">
            <button
              onClick={() => {
                setShowSheetsViewer(false);
                setIsAdminAuthModalOpen(true);
              }}
              className="w-full py-3 rounded-xl bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-bold text-xs shadow-md transition cursor-pointer flex items-center justify-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Sign In as Admin to View Database</span>
            </button>
            <button
              onClick={() => setShowSheetsViewer(false)}
              className="w-full py-2.5 rounded-xl text-slate-500 hover:text-slate-800 text-xs font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }


  const handleSync = async () => {
    setIsSyncing(true);
    await triggerWebhookSync();
    setIsSyncing(false);
    setSyncSuccessMessage('Synchronized bi-directionally with Google Sheets & Make.com Webhook!');
    setTimeout(() => setSyncSuccessMessage(null), 3000);
  };

  const exportCurrentSheetToCSV = () => {
    let headers: string[] = [];
    let rows: any[] = [];
    let filename = 'le_bol_sante_sheet.csv';

    if (activeSheet === 'customers') {
      filename = 'Sheet1_Customer_Master.csv';
      headers = ['Customer_ID (Phone)', 'Name', 'Email', 'Delivery Type', 'Address', 'Google Maps URL', 'Allergies'];
      rows = customersSheet.map((c) => [
        c.mobile,
        `"${c.fullName}"`,
        c.email,
        `"${c.deliveryType}"`,
        `"${c.flatDoorNo}, ${c.buildingOrGym}, ${c.street}, ${c.landmark}, ${c.pinCode}"`,
        `"${c.googleMapUrl}"`,
        `"${c.dietaryPreferences}"`
      ]);
    } else if (activeSheet === 'subscriptions') {
      filename = 'Sheet2_Active_Subscriptions.csv';
      headers = [
        'Subscription_ID',
        'Customer_ID (Phone)',
        'Customer Name',
        'Plan Type',
        'Selected Pattern',
        'Session Slot',
        'Buddy Add-On (Y/N)',
        'Start Date',
        'Current End Date',
        'Meals Total',
        'Meals Remaining',
        'Renewal Discount Eligible (Y/N)',
        'Status'
      ];
      rows = subscriptionsSheet.map((s) => [
        s.subscriptionId,
        s.customerPhone,
        `"${s.customerName}"`,
        s.planType,
        s.pattern,
        s.sessionSlot,
        s.buddyAddOn ? 'Y' : 'N',
        s.startDate,
        s.endDate,
        s.mealsTotal,
        s.mealsRemaining,
        s.renewalDiscountEligible ? 'Y' : 'N',
        s.status
      ]);
    } else if (activeSheet === 'kitchen') {
      filename = 'Sheet3_Daily_Kitchen_Fulfillment_Log.csv';
      headers = [
        'Date',
        'Customer Name',
        'Phone',
        'Delivery Slot',
        'Meal Item',
        'Dietary Notes',
        'Status',
        'Delivery Address / Gym'
      ];
      rows = kitchenLogsSheet.map((k) => [
        k.date,
        `"${k.customerName}"`,
        k.phone,
        k.deliverySlot,
        `"${k.mealItem}"`,
        `"${k.dietaryNotes}"`,
        k.status,
        `"${k.deliveryAddress}"`
      ]);
    } else {
      filename = 'Sheet4_Financials_And_Refunds.csv';
      headers = [
        'Transaction ID',
        'Date',
        'Customer Phone',
        'Customer Name',
        'Plan / Package',
        'Payment Amount',
        'Prorated Refund Requested (Y/N)',
        'Meals Delivered Value',
        'Refund Balance Due',
        'Refund Status'
      ];
      rows = financialsSheet.map((f) => [
        f.transactionId,
        f.date,
        f.customerPhone,
        `"${f.customerName}"`,
        `"${f.planName}"`,
        f.paymentAmount,
        f.proratedRefundRequested ? 'Y' : 'N',
        f.mealsDeliveredValue,
        f.refundBalanceDue,
        f.refundStatus
      ]);
    }

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-xs flex items-center justify-center p-2 sm:p-6">
      <div className="bg-white rounded-3xl w-full max-w-7xl h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Top Control Bar */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-900 via-[#1B5E20] to-[#2E7D32] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center">
              <TableProperties className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold font-display">
                  Live Operations &amp; Google Sheets Database
                </h2>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-400 text-emerald-950">
                  Bi-Directional v4
                </span>
              </div>
              <p className="text-xs text-emerald-200">
                Connected to Customer_Master, Active_Subscriptions, Daily_Kitchen_Log &amp; Financials
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSync}
              disabled={isSyncing}
              className="px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Syncing...' : 'Sync Webhook / Sheets'}</span>
            </button>

            <button
              onClick={exportCurrentSheetToCSV}
              className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={() => setShowSheetsViewer(false)}
              className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Sync alert */}
        {syncSuccessMessage && (
          <div className="px-6 py-2 bg-emerald-100 border-b border-emerald-300 text-[#1B5E20] text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{syncSuccessMessage}</span>
          </div>
        )}

        {/* Sheet Tabs & Search Bar */}
        <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            {[
              { id: 'kitchen', label: 'Sheet 3: Daily_Kitchen_Fulfillment_Log', count: kitchenLogsSheet.length },
              { id: 'subscriptions', label: 'Sheet 2: Active_Subscriptions', count: subscriptionsSheet.length },
              { id: 'customers', label: 'Sheet 1: Customer_Master', count: customersSheet.length },
              { id: 'financials', label: 'Sheet 4: Financials_And_Refunds', count: financialsSheet.length }
            ].map((tab) => {
              const isActive = activeSheet === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveSheet(tab.id as any);
                    setSearchTerm('');
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#2E7D32] text-white shadow-xs'
                      : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-emerald-900 text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="relative w-full md:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search sheet..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-300 text-xs bg-white text-slate-800 focus:outline-hidden focus:border-[#2E7D32]"
            />
          </div>
        </div>

        {/* Spreadsheet Data Grid */}
        <div className="flex-1 overflow-auto p-4 bg-white">
          {activeSheet === 'kitchen' && (
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase font-black tracking-wider border-b border-slate-200">
                  <th className="p-3">Date</th>
                  <th className="p-3">Customer Name</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Delivery Slot</th>
                  <th className="p-3">Meal Item</th>
                  <th className="p-3">Dietary Notes</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Delivery Address / Gym</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {kitchenLogsSheet
                  .filter((row) =>
                    !searchTerm ||
                    row.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    row.phone.includes(searchTerm) ||
                    row.mealItem.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50 transition">
                      <td className="p-3 font-mono text-slate-500">{row.date}</td>
                      <td className="p-3 font-bold text-slate-900">{row.customerName}</td>
                      <td className="p-3 font-mono text-slate-600">{row.phone}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 font-mono font-bold text-slate-800">
                          {row.deliverySlot}
                        </span>
                      </td>
                      <td className="p-3 font-semibold text-[#1B5E20]">{row.mealItem}</td>
                      <td className="p-3 text-slate-500 max-w-xs truncate">{row.dietaryNotes}</td>
                      <td className="p-3">
                        <select
                          value={row.status}
                          onChange={(e) => updateKitchenLogStatus(row.id, e.target.value as any)}
                          className={`text-xs font-bold px-2 py-1 rounded-lg border cursor-pointer ${
                            row.status === 'Active'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                              : row.status === 'Pushed'
                              ? 'bg-amber-50 text-amber-800 border-amber-300'
                              : 'bg-rose-50 text-rose-800 border-rose-300'
                          }`}
                        >
                          <option value="Active">Active</option>
                          <option value="Pushed">Pushed (5 PM)</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="p-3 text-slate-600 max-w-xs truncate">{row.deliveryAddress}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}

          {activeSheet === 'subscriptions' && (
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase font-black tracking-wider border-b border-slate-200">
                  <th className="p-3">Subscription_ID</th>
                  <th className="p-3">Customer_ID (Phone)</th>
                  <th className="p-3">Customer Name</th>
                  <th className="p-3">Plan Type</th>
                  <th className="p-3">Pattern</th>
                  <th className="p-3">Slot</th>
                  <th className="p-3">Buddy (Y/N)</th>
                  <th className="p-3">Timeline (Start - End)</th>
                  <th className="p-3">Meals (Left / Total)</th>
                  <th className="p-3">Renewal Discount</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {subscriptionsSheet
                  .filter((s) =>
                    !searchTerm ||
                    s.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    s.customerPhone.includes(searchTerm) ||
                    s.subscriptionId.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((s) => (
                    <tr key={s.subscriptionId} className="hover:bg-slate-50 transition">
                      <td className="p-3 font-mono font-bold text-slate-800">{s.subscriptionId}</td>
                      <td className="p-3 font-mono text-slate-600">{s.customerPhone}</td>
                      <td className="p-3 font-bold text-slate-900">{s.customerName}</td>
                      <td className="p-3 capitalize font-bold text-[#1B5E20]">{s.planType}</td>
                      <td className="p-3">{s.pattern}</td>
                      <td className="p-3 font-mono font-bold">{s.sessionSlot}</td>
                      <td className="p-3 font-bold">{s.buddyAddOn ? 'Y (5% duo)' : 'N'}</td>
                      <td className="p-3 font-mono text-slate-600">
                        {s.startDate} &rarr; {s.endDate}
                      </td>
                      <td className="p-3 font-bold">
                        {s.mealsRemaining} / {s.mealsTotal}
                      </td>
                      <td className="p-3">{s.renewalDiscountEligible ? 'Eligible (5%)' : 'Standard'}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          {s.status}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}

          {activeSheet === 'customers' && (
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase font-black tracking-wider border-b border-slate-200">
                  <th className="p-3">Customer_ID (Phone)</th>
                  <th className="p-3">Full Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Delivery Type</th>
                  <th className="p-3">Address Hub</th>
                  <th className="p-3">Landmark &amp; Pin</th>
                  <th className="p-3">Google Map Link</th>
                  <th className="p-3">Allergies / Dietary</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {customersSheet
                  .filter((c) =>
                    !searchTerm ||
                    c.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    c.mobile.includes(searchTerm) ||
                    c.email.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((c) => (
                    <tr key={c.mobile} className="hover:bg-slate-50 transition">
                      <td className="p-3 font-mono font-bold text-slate-900">+91 {c.mobile}</td>
                      <td className="p-3 font-bold text-slate-800">{c.fullName}</td>
                      <td className="p-3 text-slate-600">{c.email}</td>
                      <td className="p-3 font-semibold text-emerald-800">{c.deliveryType}</td>
                      <td className="p-3 text-slate-700">{c.flatDoorNo}, {c.buildingOrGym}, {c.street}</td>
                      <td className="p-3 text-slate-500">{c.landmark} ({c.pinCode})</td>
                      <td className="p-3">
                        <a
                          href={c.googleMapUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#2E7D32] hover:underline flex items-center gap-1 font-mono text-[11px]"
                        >
                          <span>Open Map</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </td>
                      <td className="p-3 text-slate-600 max-w-xs">{c.dietaryPreferences}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}

          {activeSheet === 'financials' && (
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase font-black tracking-wider border-b border-slate-200">
                  <th className="p-3">Transaction ID</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Customer Phone</th>
                  <th className="p-3">Plan / Item Name</th>
                  <th className="p-3">Amount Paid</th>
                  <th className="p-3">Refund Requested</th>
                  <th className="p-3">Delivered Value</th>
                  <th className="p-3">Refund Due</th>
                  <th className="p-3">Refund Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {financialsSheet
                  .filter((f) =>
                    !searchTerm ||
                    f.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    f.customerPhone.includes(searchTerm) ||
                    f.transactionId.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((f) => (
                    <tr key={f.transactionId} className="hover:bg-slate-50 transition">
                      <td className="p-3 font-mono font-bold text-slate-800">{f.transactionId}</td>
                      <td className="p-3 font-mono text-slate-500">{f.date}</td>
                      <td className="p-3 font-mono text-slate-600">{f.customerPhone}</td>
                      <td className="p-3 font-semibold text-slate-900">{f.planName}</td>
                      <td className="p-3 font-bold text-[#1B5E20]">₹{f.paymentAmount}</td>
                      <td className="p-3 font-bold">{f.proratedRefundRequested ? 'Yes (Prorated)' : 'No'}</td>
                      <td className="p-3 font-mono text-slate-600">₹{f.mealsDeliveredValue}</td>
                      <td className="p-3 font-bold text-rose-700">₹{f.refundBalanceDue}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          f.refundStatus === 'None'
                            ? 'bg-slate-100 text-slate-600'
                            : f.refundStatus === 'Requested'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {f.refundStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Footer Webhook Integration Bar */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="font-bold text-slate-600 shrink-0">Make.com / Apps Script Webhook:</span>
            <input
              type="url"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              className="px-2.5 py-1 rounded-lg border border-slate-300 font-mono text-[11px] w-full sm:w-80 bg-white"
            />
          </div>

          <div className="flex items-center gap-3 text-slate-500">
            {lastWebhookSyncTime && (
              <span>Last Synced: <strong className="text-slate-800">{lastWebhookSyncTime}</strong></span>
            )}
            <span className="text-[11px] bg-emerald-100 text-[#1B5E20] px-2 py-0.5 rounded-md font-bold">
              Google Sheets V4 Ready
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
