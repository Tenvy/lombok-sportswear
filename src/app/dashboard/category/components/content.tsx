import {
  Plus,
  FolderTree,
  CheckCircle,
  Package,
  Clock,
  Search,
  Eye,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Maximize2,
  X,
  RefreshCw,
  UploadCloud,
  Shirt,
  Tag,
  Briefcase,
  Sparkles,
  Gem,
  Sun,
  Snowflake,
  Percent,
  Crown,
  Zap,
  Folder,
  File,
  Minus,
} from "lucide-react";

const statusBadge = (status: string) => {
  const styles: Record<string, string> = {
    Active: "bg-emerald-50 text-emerald-600",
    Inactive: "bg-gray-100 text-gray-400",
    Draft: "bg-sky-50 text-sky-600",
  };
  return styles[status] || styles.Active;
};

const categories = [
  { id: "cat-mens", icon: Shirt, iconBg: "bg-gray-100", iconColor: "text-gray-500", name: "Men's Collection", sub: "Parent · 3 subcategories", slug: "mens-collection", desc: "Premium sportswear for men. All styles.", products: 156, status: "Active", created: "2 months ago", isParent: true, nameClass: "font-semibold" },
  { id: "cat-polo", icon: Tag, iconBg: "bg-gray-50", iconColor: "text-gray-400", name: "Polo Shirts", sub: "Child of Men's Collection", slug: "polo-shirts", desc: "Classic polo shirts for everyday wear", products: 42, status: "Active", created: "2 months ago", isParent: false, nameClass: "font-medium", isChild: true },
  { id: "cat-tshirts", icon: Tag, iconBg: "bg-gray-50", iconColor: "text-gray-400", name: "T-Shirts", sub: "Child of Men's Collection", slug: "t-shirts", desc: "Comfortable crew neck and v-neck tees", products: 38, status: "Active", created: "6 weeks ago", isParent: false, nameClass: "font-medium", isChild: true },
  { id: "cat-casual-men", icon: Tag, iconBg: "bg-gray-50", iconColor: "text-gray-400", name: "Casual Wear", sub: "Child of Men's Collection", slug: "casual-wear-men", desc: "Relaxed everyday clothing for men", products: 35, status: "Active", created: "5 weeks ago", isParent: false, nameClass: "font-medium", isChild: true },
  { id: "cat-formal", icon: Briefcase, iconBg: "bg-gray-100", iconColor: "text-gray-500", name: "Formal Wear", sub: "Parent · No subcategories", slug: "formal-wear", desc: "Blazers, dress shirts, and formal pants", products: 29, status: "Active", created: "1 month ago", isParent: true, nameClass: "font-semibold" },
  { id: "cat-womens", icon: Sparkles, iconBg: "bg-gray-100", iconColor: "text-gray-500", name: "Women's Collection", sub: "Parent · 3 subcategories", slug: "womens-collection", desc: "Stylish sportswear for women", products: 148, status: "Active", created: "2 months ago", isParent: true, nameClass: "font-semibold" },
  { id: "cat-dresses", icon: Tag, iconBg: "bg-gray-50", iconColor: "text-gray-400", name: "Dresses", sub: "Child of Women's Collection", slug: "dresses", desc: "Sport dresses and active dresses", products: 54, status: "Active", created: "6 weeks ago", isParent: false, nameClass: "font-medium", isChild: true },
  { id: "cat-blouses", icon: Tag, iconBg: "bg-gray-50", iconColor: "text-gray-400", name: "Blouses", sub: "Child of Women's Collection", slug: "blouses", desc: "Elegant blouses and sport tops", products: 45, status: "Active", created: "5 weeks ago", isParent: false, nameClass: "font-medium", isChild: true },
  { id: "cat-casual-women", icon: Tag, iconBg: "bg-gray-50", iconColor: "text-gray-400", name: "Casual Wear", sub: "Child of Women's Collection", slug: "casual-wear-women", desc: "Comfortable everyday wear for women", products: 49, status: "Active", created: "4 weeks ago", isParent: false, nameClass: "font-medium", isChild: true },
  { id: "cat-accessories", icon: Gem, iconBg: "bg-gray-100", iconColor: "text-gray-500", name: "Accessories", sub: "Parent · Belts, bags, fragrance", slug: "accessories", desc: "Belts, bags, perfumes, and more", products: 48, status: "Active", created: "3 weeks ago", isParent: true, nameClass: "font-semibold" },
  { id: "cat-summer", icon: Sun, iconBg: "bg-amber-50", iconColor: "text-amber-500", name: "Summer Collection", sub: "Seasonal · Featured", slug: "summer-collection", desc: "Hot weather essentials and light fabrics", products: 32, status: "Active", created: "1 week ago", isParent: true, nameClass: "font-semibold" },
  { id: "cat-winter", icon: Snowflake, iconBg: "bg-gray-100", iconColor: "text-gray-400", name: "Winter Collection", sub: "Seasonal · Archived", slug: "winter-collection", desc: "Cold weather styles, currently archived", products: 0, status: "Inactive", created: "4 months ago", isParent: true, nameClass: "font-semibold", faded: true },
  { id: "cat-sale", icon: Percent, iconBg: "bg-sky-50", iconColor: "text-sky-500", name: "Sale Items", sub: "Dynamic · Pending setup", slug: "sale-items", desc: "Discounted items, setup in progress", products: 0, status: "Draft", created: "3 days ago", isParent: true, nameClass: "font-semibold", nameColor: "text-sky-700", subColor: "text-sky-400" },
  { id: "cat-limited", icon: Crown, iconBg: "bg-gray-100", iconColor: "text-amber-500", name: "Limited Edition", sub: "Exclusive drops · Time-limited", slug: "limited-edition", desc: "Exclusive limited run products", products: 18, status: "Active", created: "1 week ago", isParent: true, nameClass: "font-semibold" },
  { id: "cat-new-arrivals", icon: Zap, iconBg: "bg-emerald-50", iconColor: "text-emerald-500", name: "New Arrivals", sub: "Dynamic · Auto-populated", slug: "new-arrivals", desc: "Latest products added in the last 30 days", products: 25, status: "Active", created: "2 hours ago", isParent: true, nameClass: "font-semibold" },
];

const kpis = [
  { icon: FolderTree, iconBg: "bg-gray-100", iconColor: "text-gray-600", badge: "+3 new", badgeColor: "text-emerald-600 bg-emerald-50", label: "Total Categories", value: "24" },
  { icon: CheckCircle, iconBg: "bg-emerald-50", iconColor: "text-emerald-600", badge: "91.7%", badgeColor: "text-emerald-600 bg-emerald-50", label: "Active", value: "22", valueColor: "text-emerald-600" },
  { icon: Package, iconBg: "bg-sky-50", iconColor: "text-sky-600", badge: "+24", badgeColor: "text-emerald-600 bg-emerald-50", label: "Total Products", value: "412" },
  { icon: Clock, iconBg: "bg-amber-50", iconColor: "text-amber-600", badge: null, badgeColor: "", label: "Last Updated", value: "2h ago" },
];

export default function CategoryContent() {
  return (
    <main className="flex-1 overflow-y-auto px-8 py-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Category Management</h1>
          <p className="mt-0.5 text-[12px] text-gray-400">
            Organize and manage product categories. <span className="font-medium text-gray-600">24 categories total</span>.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-[11px] font-medium text-gray-500 focus:border-gray-400 focus:outline-none">
            <option>Name (A-Z)</option>
            <option>Created Date (Newest)</option>
            <option>Products Count (High)</option>
          </select>
          <button className="flex items-center gap-2 rounded-lg bg-black px-3.5 py-2 text-[11px] font-semibold text-white transition-colors hover:bg-gray-800">
            <Plus className="text-sm" />
            Add Category
          </button>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="rounded-xl border border-gray-200 bg-white p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${kpi.iconBg}`}>
                <kpi.icon className={`text-base ${kpi.iconColor}`} />
              </div>
              {kpi.badge && <span className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${kpi.badgeColor}`}>{kpi.badge}</span>}
            </div>
            <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-gray-400">{kpi.label}</p>
            <p className={`mt-0.5 text-lg font-bold tracking-tight ${kpi.valueColor || ""}`}>{kpi.value}</p>
          </div>
        ))}
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="flex items-center justify-between gap-3 border-b border-gray-100 px-5 py-3">
          <div className="flex flex-1 items-center gap-2">
            <div className="relative max-w-[240px] flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400" />
              <input type="text" placeholder="Search categories..." className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-3 text-[12px] transition-colors focus:border-gray-400 focus:bg-white focus:outline-none" />
            </div>
            <select className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-[12px] text-gray-500 focus:border-gray-400 focus:outline-none">
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
              <option>Draft</option>
            </select>
            <select className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-[12px] text-gray-500 focus:border-gray-400 focus:outline-none">
              <option>All Levels</option>
              <option>Parent Only</option>
              <option>Child Only</option>
            </select>
          </div>
          <span className="whitespace-nowrap text-[11px] text-gray-400">Showing 1–15 of 24</span>
        </div>

        <div className="flex items-center justify-between border-b border-gray-50 bg-gray-50/50 px-5 py-2.5">
          <div className="flex items-center gap-3">
            <label className="flex cursor-pointer items-center gap-2">
              <input type="checkbox" className="h-3.5 w-3.5 rounded accent-black" />
              <span className="text-[11px] font-medium text-gray-500">Select All</span>
            </label>
            <div className="h-4 w-px bg-gray-200" />
            <select className="rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-[11px] text-gray-500 focus:border-gray-400 focus:outline-none">
              <option>Bulk Actions</option>
              <option>Set Active</option>
              <option>Set Inactive</option>
              <option>Delete Selected</option>
              <option>Export</option>
            </select>
            <button className="rounded-lg border border-gray-200 px-3 py-1.5 text-[11px] font-semibold transition-colors hover:bg-gray-100">Apply</button>
          </div>
          <span className="text-[11px] text-gray-400">0 selected</span>
        </div>

        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/60">
              <th className="w-10 px-5 py-3"><input type="checkbox" className="h-3.5 w-3.5 rounded accent-black" /></th>
              <th className="py-3 text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400">Category Name</th>
              <th className="w-[160px] py-3 text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400">Slug</th>
              <th className="w-[200px] py-3 text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400">Description</th>
              <th className="w-[90px] py-3 text-center text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400">Products</th>
              <th className="w-[90px] py-3 text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400">Status</th>
              <th className="w-[100px] py-3 text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400">Created</th>
              <th className="w-[70px] pr-5 py-3 text-right text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => {
              const IconComp = cat.icon;
              return (
                <tr key={cat.id} className="border-b border-gray-50 transition-colors">
                  <td className="px-5 py-2.5"><input type="checkbox" className="h-3.5 w-3.5 rounded accent-black" /></td>
                  <td className="py-2.5">
                    <div className="flex items-center gap-2.5">
                      <div className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md ${cat.iconBg}`}>
                        <IconComp className={`text-[13px] ${cat.iconColor}`} />
                      </div>
                      <div>
                        <a id={cat.id} href="#" className={`text-[12px] hover:underline ${cat.nameClass} ${cat.nameColor || (cat.faded ? "text-gray-400" : "")}`}>
                          {cat.name}
                        </a>
                        <p className={`mt-0.5 text-[9px] ${cat.subColor || (cat.faded ? "text-gray-300" : "text-gray-400")}`}>{cat.sub}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-2.5">
                    <span className={`font-mono text-[11px] ${cat.faded ? "text-gray-300" : "text-gray-400"}`}>{cat.slug}</span>
                  </td>
                  <td className="py-2.5">
                    <span className={`block max-w-[180px] truncate text-[11px] ${cat.faded ? "text-gray-300" : "text-gray-500"}`}>{cat.desc}</span>
                  </td>
                  <td className="py-2.5 text-center">
                    <span className={`text-[12px] font-bold ${cat.faded ? "text-gray-400" : ""}`}>{cat.products}</span>
                  </td>
                  <td className="py-2.5">
                    <span className={`rounded-full px-2 py-1 text-[9px] font-bold uppercase tracking-wider ${statusBadge(cat.status)}`}>{cat.status}</span>
                  </td>
                  <td className={`py-2.5 text-[11px] ${cat.faded ? "text-gray-300" : "text-gray-400"}`}>{cat.created}</td>
                  <td className="py-2.5 pr-5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="rounded p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-black"><Eye className="text-[13px]" /></button>
                      <button className="rounded p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-black"><Pencil className="text-[13px]" /></button>
                      <button className="rounded p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-red-500"><Trash2 className="text-[13px]" /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="flex items-center justify-between border-t border-gray-100 px-5 py-3">
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-gray-400">Rows per page:</span>
            <select className="rounded border border-gray-200 bg-white px-2 py-1 text-[11px] font-medium focus:border-gray-400 focus:outline-none">
              <option>15</option>
              <option>25</option>
              <option>50</option>
            </select>
          </div>
          <div className="flex items-center gap-1">
            <button className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-gray-400 transition-colors hover:border-gray-400 hover:text-black">
              <ChevronLeft className="text-sm" />
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-md bg-black text-[11px] font-bold text-white">1</button>
            <button className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-[11px] font-medium text-gray-500 transition-colors hover:border-gray-400 hover:text-black">2</button>
            <button className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-gray-400 transition-colors hover:border-gray-400 hover:text-black">
              <ChevronRight className="text-sm" />
            </button>
            <div className="ml-3 flex items-center gap-1.5 border-l border-gray-200 pl-3">
              <span className="text-[11px] text-gray-400">Go to:</span>
              <input type="number" defaultValue={1} min={1} max={2} className="w-12 rounded border border-gray-200 px-2 py-1 text-center text-[11px] font-medium focus:border-gray-400 focus:outline-none" />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8 mt-6 grid grid-cols-12 gap-4">
        <div className="col-span-5 rounded-xl border border-gray-200 bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-[13px] font-bold">Category Hierarchy</h3>
              <p className="mt-0.5 text-[11px] text-gray-400">Visual overview of parent-child structure</p>
            </div>
            <button className="rounded p-1.5 text-gray-400 transition-colors hover:bg-gray-100">
              <Maximize2 className="text-sm" />
            </button>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2">
              <ChevronDown className="text-xs text-gray-400" />
              <Folder className="text-sm text-gray-600" />
              <span className="text-[12px] font-semibold">Men&apos;s Collection</span>
              <span className="ml-auto text-[10px] font-medium text-gray-400">156</span>
            </div>
            <div className="ml-6 space-y-0.5">
              {[
                { name: "Polo Shirts", count: 42 },
                { name: "T-Shirts", count: 38 },
                { name: "Casual Wear", count: 35 },
              ].map((child) => (
                <div key={child.name} className="flex items-center gap-2 rounded-lg px-3 py-1.5 transition-colors hover:bg-gray-50">
                  <File className="text-xs text-gray-400" />
                  <span className="text-[11px] text-gray-600">{child.name}</span>
                  <span className="ml-auto text-[10px] text-gray-400">{child.count}</span>
                </div>
              ))}
            </div>

            <div className="mt-1.5 flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2">
              <ChevronDown className="text-xs text-gray-400" />
              <Folder className="text-sm text-gray-600" />
              <span className="text-[12px] font-semibold">Women&apos;s Collection</span>
              <span className="ml-auto text-[10px] font-medium text-gray-400">148</span>
            </div>
            <div className="ml-6 space-y-0.5">
              {[
                { name: "Dresses", count: 54 },
                { name: "Blouses", count: 45 },
                { name: "Casual Wear", count: 49 },
              ].map((child) => (
                <div key={child.name} className="flex items-center gap-2 rounded-lg px-3 py-1.5 transition-colors hover:bg-gray-50">
                  <File className="text-xs text-gray-400" />
                  <span className="text-[11px] text-gray-600">{child.name}</span>
                  <span className="ml-auto text-[10px] text-gray-400">{child.count}</span>
                </div>
              ))}
            </div>

            {[
              { name: "Formal Wear", count: 29, iconColor: "text-gray-600" },
              { name: "Accessories", count: 48, iconColor: "text-gray-600" },
              { name: "Limited Edition", count: 18, iconColor: "text-amber-500" },
              { name: "New Arrivals", count: 25, iconColor: "text-emerald-500" },
            ].map((cat) => (
              <div key={cat.name} className="mt-1.5 flex items-center gap-2 rounded-lg px-3 py-2 transition-colors hover:bg-gray-50">
                <Minus className="text-xs text-gray-300" />
                <Folder className={`text-sm ${cat.iconColor}`} />
                <span className="text-[12px] font-semibold">{cat.name}</span>
                <span className="ml-auto text-[10px] font-medium text-gray-400">{cat.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-7 rounded-xl border border-gray-200 bg-white p-5">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="text-[13px] font-bold">Add New Category</h3>
              <p className="mt-0.5 text-[11px] text-gray-400">Fill in the details for a new product category</p>
            </div>
            <button className="rounded p-1.5 text-gray-400 transition-colors hover:bg-gray-100">
              <X className="text-sm" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-[11px] font-semibold text-gray-700">
                Category Name <span className="text-red-400">*</span>
              </label>
              <input type="text" placeholder="e.g., Sport Jackets" className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-[12px] transition-colors focus:border-gray-400 focus:outline-none" />
            </div>
            <div>
              <label className="mb-1.5 block text-[11px] font-semibold text-gray-700">URL Slug</label>
              <div className="relative">
                <input type="text" placeholder="auto-generated" className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 pr-9 font-mono text-[12px] text-gray-500 transition-colors focus:border-gray-400 focus:outline-none" />
                <button className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-black">
                  <RefreshCw className="text-xs" />
                </button>
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-[11px] font-semibold text-gray-700">Parent Category</label>
              <select className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-[12px] text-gray-500 transition-colors focus:border-gray-400 focus:outline-none">
                <option>No Parent (Top Level)</option>
                <option>Men&apos;s Collection</option>
                <option>Women&apos;s Collection</option>
                <option>Accessories</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-[11px] font-semibold text-gray-700">Status</label>
              <div className="flex items-center gap-3 py-2">
                <label className="flex cursor-pointer items-center gap-2">
                  <input type="radio" name="status" defaultChecked className="h-3.5 w-3.5 accent-black" />
                  <span className="text-[11px] font-medium">Active</span>
                </label>
                <label className="flex cursor-pointer items-center gap-2">
                  <input type="radio" name="status" className="h-3.5 w-3.5 accent-black" />
                  <span className="text-[11px] font-medium text-gray-500">Inactive</span>
                </label>
                <label className="flex cursor-pointer items-center gap-2">
                  <input type="radio" name="status" className="h-3.5 w-3.5 accent-black" />
                  <span className="text-[11px] font-medium text-gray-500">Draft</span>
                </label>
              </div>
            </div>
            <div className="col-span-2">
              <label className="mb-1.5 block text-[11px] font-semibold text-gray-700">Description</label>
              <textarea placeholder="Brief description of this category..." rows={3} className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2.5 text-[12px] transition-colors focus:border-gray-400 focus:outline-none" />
            </div>
            <div>
              <label className="mb-1.5 block text-[11px] font-semibold text-gray-700">Meta Description</label>
              <input type="text" placeholder="SEO meta description" className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-[12px] transition-colors focus:border-gray-400 focus:outline-none" />
            </div>
            <div>
              <label className="mb-1.5 block text-[11px] font-semibold text-gray-700">Meta Keywords</label>
              <input type="text" placeholder="keyword1, keyword2, keyword3" className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-[12px] transition-colors focus:border-gray-400 focus:outline-none" />
            </div>
            <div className="col-span-2">
              <label className="mb-1.5 block text-[11px] font-semibold text-gray-700">Featured Image</label>
              <div className="cursor-pointer rounded-lg border-2 border-dashed border-gray-200 p-4 text-center transition-colors hover:border-gray-400">
                <UploadCloud className="mx-auto text-2xl text-gray-300" />
                <p className="mt-1.5 text-[11px] text-gray-400">Click to upload or drag and drop</p>
                <p className="mt-0.5 text-[9px] text-gray-300">PNG, JPG or WebP (max 2MB)</p>
              </div>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-end gap-2 border-t border-gray-100 pt-4">
            <button className="rounded-lg border border-gray-200 px-4 py-2.5 text-[11px] font-semibold transition-colors hover:bg-gray-50">Cancel</button>
            <button className="rounded-lg bg-black px-5 py-2.5 text-[11px] font-semibold text-white transition-colors hover:bg-gray-800">Save Category</button>
          </div>
        </div>
      </div>
    </main>
  );
}
