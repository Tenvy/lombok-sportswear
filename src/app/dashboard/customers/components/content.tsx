import {
  Download,
  Upload,
  UserPlus,
  Users,
  Crown,
  UserCheck,
  HeartHandshake,
  Search,
  Eye,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Mail,
  UserX,
  Merge,
} from "lucide-react";

const segmentBadge = (segment: string) => {
  const styles: Record<string, string> = {
    VIP: "bg-amber-50 text-amber-600",
    Regular: "bg-gray-100 text-gray-500",
    New: "bg-sky-50 text-sky-600",
    Inactive: "bg-gray-100 text-gray-400",
  };
  return styles[segment] || styles.Regular;
};

const avatarStyles: Record<string, string> = {
  VIP: "bg-amber-100 text-amber-700",
  Regular: "bg-gray-100 text-gray-600",
  New: "bg-sky-100 text-sky-700",
  Inactive: "bg-gray-100 text-gray-400",
};

const customers = [
  { id: "cust-1", initials: "AR", name: "Andi Rahmat", email: "andi.rahmat@gmail.com", phone: "+62 812-3456-7890", orders: 47, ltv: "Rp 18.2M", joined: "Jan 2023", segment: "VIP", active: true },
  { id: "cust-2", initials: "DS", name: "Dian Saputra", email: "dian.saputra@yahoo.com", phone: "+62 857-1234-5678", orders: 12, ltv: "Rp 3.8M", joined: "Mar 2024", segment: "Regular", active: true },
  { id: "cust-3", initials: "RK", name: "Rina Kartika", email: "rina.kartika@outlook.com", phone: "+62 821-9876-5432", orders: 53, ltv: "Rp 24.6M", joined: "Nov 2022", segment: "VIP", active: true },
  { id: "cust-4", initials: "FN", name: "Fajar Nugroho", email: "fajar.n@gmail.com", phone: "+62 838-4567-8901", orders: 2, ltv: "Rp 849K", joined: "Jun 2025", segment: "New", active: true },
  { id: "cust-5", initials: "MP", name: "Mega Permata", email: "mega.permata@gmail.com", phone: "+62 878-2345-6789", orders: 18, ltv: "Rp 5.6M", joined: "Aug 2023", segment: "Regular", active: true },
  { id: "cust-6", initials: "BS", name: "Budi Santoso", email: "budi.s@yahoo.co.id", phone: "+62 813-7890-1234", orders: 3, ltv: "Rp 547K", joined: "Feb 2024", segment: "Inactive", active: false },
  { id: "cust-7", initials: "WP", name: "Wahyu Pratama", email: "wahyu.p@gmail.com", phone: "+62 856-5432-1098", orders: 38, ltv: "Rp 14.7M", joined: "May 2023", segment: "VIP", active: true },
  { id: "cust-8", initials: "SA", name: "Siti Aminah", email: "siti.aminah@gmail.com", phone: "+62 822-6789-0123", orders: 1, ltv: "Rp 289K", joined: "Jun 2025", segment: "New", active: true },
  { id: "cust-9", initials: "HW", name: "Hendra Wijaya", email: "hendra.w@outlook.com", phone: "+62 819-3456-7890", orders: 9, ltv: "Rp 2.1M", joined: "Oct 2024", segment: "Regular", active: true },
  { id: "cust-10", initials: "NF", name: "Nadia Fitri", email: "nadia.fitri@yahoo.com", phone: "+62 852-8901-2345", orders: 22, ltv: "Rp 7.3M", joined: "Apr 2023", segment: "Regular", active: true },
  { id: "cust-11", initials: "RA", name: "Rizky Aditya", email: "rizky.a@gmail.com", phone: "+62 881-2345-6789", orders: 1, ltv: "Rp 459K", joined: "Jun 2025", segment: "New", active: true },
  { id: "cust-12", initials: "IH", name: "Indra Hermawan", email: "indra.h@gmail.com", phone: "+62 815-6789-0123", orders: 7, ltv: "Rp 1.8M", joined: "Dec 2024", segment: "Regular", active: true },
];

const kpis = [
  { icon: Users, iconBg: "bg-violet-50", iconColor: "text-violet-600", badge: "+15%", badgeColor: "text-emerald-600 bg-emerald-50", label: "Total Customers", value: "3,542" },
  { icon: Crown, iconBg: "bg-amber-50", iconColor: "text-amber-600", badge: "8.0%", badgeColor: "text-amber-600 bg-amber-50", label: "VIP Customers", value: "284" },
  { icon: UserCheck, iconBg: "bg-sky-50", iconColor: "text-sky-600", badge: "+156", badgeColor: "text-emerald-600 bg-emerald-50", label: "New This Month", value: "156" },
  { icon: HeartHandshake, iconBg: "bg-emerald-50", iconColor: "text-emerald-600", badge: "+9%", badgeColor: "text-emerald-600 bg-emerald-50", label: "Avg. Lifetime Value", value: "Rp 2.4M" },
];

const cities = [
  { name: "Jakarta", count: "1,284", width: "100%", bar: "bg-black" },
  { name: "Surabaya", count: "687", width: "53%", bar: "bg-gray-600" },
  { name: "Bandung", count: "542", width: "42%", bar: "bg-gray-400" },
  { name: "Mataram", count: "398", width: "31%", bar: "bg-gray-300" },
  { name: "Yogyakarta", count: "312", width: "24%", bar: "bg-gray-200" },
];

export default function CustomersContent() {
  return (
    <main className="flex-1 overflow-y-auto px-8 py-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Customers</h1>
          <p className="mt-0.5 text-[12px] text-gray-400">Manage customer profiles, segments, and communication.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 rounded-lg border border-gray-200 px-3.5 py-2 text-[11px] font-semibold transition-colors hover:bg-gray-50">
            <Download className="text-sm" />
            Export
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-gray-200 px-3.5 py-2 text-[11px] font-semibold transition-colors hover:bg-gray-50">
            <Upload className="text-sm" />
            Import
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-black px-3.5 py-2 text-[11px] font-semibold text-white transition-colors hover:bg-gray-800">
            <UserPlus className="text-sm" />
            Add Customer
          </button>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-4 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="rounded-xl border border-gray-200 bg-white p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${kpi.iconBg}`}>
                <kpi.icon className={`text-base ${kpi.iconColor}`} />
              </div>
              <span className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${kpi.badgeColor}`}>{kpi.badge}</span>
            </div>
            <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-gray-400">{kpi.label}</p>
            <p className="mt-0.5 text-lg font-bold tracking-tight">{kpi.value}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-4">
        <div className="min-w-0 flex-1">
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <div className="flex items-center justify-between gap-3 border-b border-gray-100 px-5 py-3">
              <div className="flex flex-1 items-center gap-2">
                <div className="relative max-w-[240px] flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400" />
                  <input type="text" placeholder="Search name, email, phone..." className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-3 text-[12px] transition-colors focus:border-gray-400 focus:bg-white focus:outline-none" />
                </div>
                <select className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-[12px] text-gray-500 focus:border-gray-400 focus:outline-none">
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
                <select className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-[12px] text-gray-500 focus:border-gray-400 focus:outline-none">
                  <option>All Segments</option>
                  <option>VIP</option>
                  <option>Regular</option>
                  <option>New</option>
                </select>
                <select className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-[12px] text-gray-500 focus:border-gray-400 focus:outline-none">
                  <option>All Cities</option>
                  <option>Jakarta</option>
                  <option>Surabaya</option>
                  <option>Bandung</option>
                  <option>Mataram</option>
                </select>
              </div>
              <span className="whitespace-nowrap text-[11px] text-gray-400">1–15 of 3,542</span>
            </div>

            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/60">
                  <th className="w-10 px-4 py-3"><input type="checkbox" className="h-3.5 w-3.5 rounded accent-black" /></th>
                  <th className="py-3 text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400">Customer</th>
                  <th className="py-3 text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400">Phone</th>
                  <th className="w-[70px] py-3 text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400">Orders</th>
                  <th className="w-[100px] py-3 text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400">LTV</th>
                  <th className="w-[90px] py-3 text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400">Joined</th>
                  <th className="w-[80px] py-3 text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400">Segment</th>
                  <th className="w-[70px] pr-5 py-3 text-right text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((c) => (
                  <tr key={c.id} className="border-b border-gray-50 transition-colors">
                    <td className="px-4 py-2.5"><input type="checkbox" className="h-3.5 w-3.5 rounded accent-black" /></td>
                    <td className="py-2.5">
                      <div className="flex items-center gap-3">
                        <div className="relative flex-shrink-0">
                          <div className={`flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-bold ${avatarStyles[c.segment]}`}>
                            {c.initials}
                          </div>
                          <span className={`absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white ${c.active ? "bg-emerald-500" : "bg-gray-300"}`} />
                        </div>
                        <div>
                          <a id={c.id} href="#" className={`text-[12px] font-semibold hover:underline ${!c.active ? "text-gray-400" : ""}`}>{c.name}</a>
                          <p className={`text-[10px] ${!c.active ? "text-gray-300" : "text-gray-400"}`}>{c.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className={`py-2.5 text-[11px] ${!c.active ? "text-gray-300" : "text-gray-500"}`}>{c.phone}</td>
                    <td className={`py-2.5 text-[12px] font-semibold ${!c.active ? "text-gray-400" : ""}`}>{c.orders}</td>
                    <td className={`py-2.5 text-[12px] font-semibold ${!c.active ? "text-gray-400" : ""}`}>{c.ltv}</td>
                    <td className={`py-2.5 text-[11px] ${!c.active ? "text-gray-300" : "text-gray-400"}`}>{c.joined}</td>
                    <td className="py-2.5">
                      <span className={`rounded-full px-2 py-1 text-[9px] font-bold uppercase tracking-wider ${segmentBadge(c.segment)}`}>{c.segment}</span>
                    </td>
                    <td className="py-2.5 pr-5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button className="rounded p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-black"><Eye className="text-[13px]" /></button>
                        <button className="rounded p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-black"><Pencil className="text-[13px]" /></button>
                        <button className="rounded p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-red-500"><Trash2 className="text-[13px]" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex items-center justify-between border-t border-gray-100 px-5 py-3">
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-gray-400">Rows per page:</span>
                <select className="rounded border border-gray-200 bg-white px-2 py-1 text-[11px] font-medium focus:border-gray-400 focus:outline-none">
                  <option>15</option>
                  <option>10</option>
                  <option>25</option>
                  <option>50</option>
                </select>
              </div>
              <div className="flex items-center gap-1">
                <button className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-gray-400 transition-colors hover:border-gray-400 hover:text-black">
                  <ChevronLeft className="text-sm" />
                </button>
                <button className="flex h-8 w-8 items-center justify-center rounded-md bg-black text-[11px] font-bold text-white">1</button>
                {[2, 3, 4, 5].map((p) => (
                  <button key={p} className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-[11px] font-medium text-gray-500 transition-colors hover:border-gray-400 hover:text-black">{p}</button>
                ))}
                <span className="px-0.5 text-[11px] text-gray-300">...</span>
                <button className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-[11px] font-medium text-gray-500 transition-colors hover:border-gray-400 hover:text-black">236</button>
                <button className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-gray-400 transition-colors hover:border-gray-400 hover:text-black">
                  <ChevronRight className="text-sm" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-[220px] flex-shrink-0 space-y-4">
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h3 className="mb-1 text-[13px] font-bold">Customer Segments</h3>
            <p className="mb-5 text-[11px] text-gray-400">Distribution overview</p>
            <div className="mb-5 flex items-center justify-center">
              <svg width="130" height="130" viewBox="0 0 130 130">
                <circle cx="65" cy="65" r="48" fill="none" stroke="#f59e0b" strokeWidth="18" strokeDasharray="24.1 277.5" strokeDashoffset="0" transform="rotate(-90 65 65)" />
                <circle cx="65" cy="65" r="48" fill="none" stroke="#9ca3af" strokeWidth="18" strokeDasharray="260.3 41.3" strokeDashoffset="-24.1" transform="rotate(-90 65 65)" />
                <circle cx="65" cy="65" r="48" fill="none" stroke="#3b82f6" strokeWidth="18" strokeDasharray="17.2 284.4" strokeDashoffset="-284.4" transform="rotate(-90 65 65)" />
                <text x="65" y="62" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#000">3,542</text>
                <text x="65" y="76" textAnchor="middle" fontSize="8" fontWeight="500" fill="#9ca3af">TOTAL</text>
              </svg>
            </div>
            <div className="space-y-3">
              {[
                { color: "bg-amber-500", label: "VIP", count: "284", pct: "8.0%" },
                { color: "bg-gray-400", label: "Regular", count: "3,058", pct: "86.3%" },
                { color: "bg-sky-500", label: "New", count: "200", pct: "5.7%" },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`h-2.5 w-2.5 rounded-full ${s.color}`} />
                    <span className="text-[11px] font-medium">{s.label}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] font-bold">{s.count}</span>
                    <span className="ml-1 text-[9px] text-gray-400">{s.pct}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h3 className="mb-1 text-[13px] font-bold">Top Cities</h3>
            <p className="mb-4 text-[11px] text-gray-400">By customer count</p>
            <div className="space-y-3">
              {cities.map((city) => (
                <div key={city.name}>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-[11px] font-medium">{city.name}</span>
                    <span className="text-[11px] font-bold">{city.count}</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">
                    <div className={`h-full rounded-full ${city.bar}`} style={{ width: city.width }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h3 className="mb-3 text-[13px] font-bold">Quick Actions</h3>
            <div className="space-y-2">
              <a id="action-email-all" href="#" className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-gray-600 transition-colors hover:bg-gray-50">
                <Mail className="text-sm text-gray-400" />
                <span className="text-[11px] font-medium">Send Newsletter</span>
              </a>
              <a id="action-export-vip" href="#" className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-gray-600 transition-colors hover:bg-gray-50">
                <Crown className="text-sm text-amber-500" />
                <span className="text-[11px] font-medium">Export VIP List</span>
              </a>
              <a id="action-inactive" href="#" className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-gray-600 transition-colors hover:bg-gray-50">
                <UserX className="text-sm text-gray-400" />
                <span className="text-[11px] font-medium">View Inactive (24)</span>
              </a>
              <a id="action-merge" href="#" className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-gray-600 transition-colors hover:bg-gray-50">
                <Merge className="text-sm text-gray-400" />
                <span className="text-[11px] font-medium">Merge Duplicates</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
