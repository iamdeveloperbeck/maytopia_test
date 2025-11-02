import { useCallback, useMemo, useState } from "react";

type Dish = {
  id: number;
  name: string;
  category: string;
  price: string;
  description: string;
  image?: string;
};

const DISHES: Dish[] = [
  { id: 1, name: "Palov", category: "Asosiy taomlar", price: "45,000", description: "Gosht, guruch, zarafshon bilan tayyorlangan o'zbekiston klassik palov", image: "/plov-dish.jpg" },
  { id: 2, name: "Shurpa", category: "Shorolar", price: "35,000", description: "Hayvon go'shti, sabzavot va kartoshka bilan sof shoropa", image: "/shorba-soup.jpg" },
  { id: 3, name: "Manti", category: "Asosiy taomlar", price: "40,000", description: "Mol go'shti bilan to'ldirilgan yumshoq mantular", image: "/manti-dumplings.jpg" },
  { id: 4, name: "Qozon Kabob", category: "Asosiy taomlar", price: "55,000", description: "Qozonda go'sht va sabzavotdan tayyorlangan traditsiyon kabob", image: "/qozon-kebab.jpg" },
  { id: 5, name: "Lagman", category: "Asosiy taomlar", price: "38,000", description: "Uzun makaron, go'sht va sabzavot bilan o'zbek uslubida lagman", image: "/lagman-noodles.jpg" },
  { id: 6, name: "Samsa", category: "Snacklar", price: "25,000", description: "Sotib olingan xamirda go'sht bilan to'ldirish samsa", image: "/samsa-pastry.jpg" },
  { id: 7, name: "Qavardak", category: "Shorolar", price: "48,000", description: "Mol go'shti va sabzavotning mazza aralashmasi qavardak", image: "/quavordak-stew.jpg" },
  { id: 8, name: "Kabob", category: "Asosiy taomlar", price: "50,000", description: "Uzunroq go'shti, piyoz va sabzavot bilan yasalgan kabob", image: "/kabob-skewers.jpg" },
];

const CATEGORIES = ["Barcha", "Asosiy taomlar", "Shorolar", "Snacklar"];

function DishCard({ dish }: { dish: Dish }) {
  return (
    <div className="bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-border hover:border-primary flex flex-col group">
      <div className="relative w-full aspect-square overflow-hidden bg-muted">
        <img
          src={dish.image ?? "/placeholder.svg"}
          alt={dish.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />

        <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/50 to-transparent p-3">
          <span className="text-sm text-white font-semibold">{dish.category}</span>
        </div>
      </div>

      <div className="p-4 flex flex-col grow">
        <h3 className="text-lg font-bold text-foreground mb-1">{dish.name}</h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{dish.description}</p>

        <div className="flex items-center justify-between mb-4 mt-auto">
          <span className="text-2xl font-bold text-primary">{dish.price}</span>
          <span className="text-sm text-muted-foreground">so'm</span>
        </div>
      </div>
    </div>
  );
}

export default function Menyu(): JSX.Element {
  const [selectedCategory, setSelectedCategory] = useState<string>(CATEGORIES[0]);

  const handleSelectCategory = useCallback((cat: string) => {
    setSelectedCategory(cat);
  }, []);

  const filtered = useMemo(() => {
    if (selectedCategory === "Barcha") return DISHES;
    return DISHES.filter((d) => d.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-linear-to-br from-primary to-secondary py-12 md:py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-3 text-balance">Ovqat Menyusi</h1>
          <p className="text-lg text-primary-foreground/90 text-balance">Eng so'ngi taomlar to'plami</p>
        </div>
      </section>

      {/* Filter */}
      <section className="py-8 px-4 border-b border-border">
        <div className="max-w-6xl mx-auto">
          <div className="flex gap-3 overflow-x-auto pb-2">
            {CATEGORIES.map((cat) => {
              const active = cat === selectedCategory;
              return (
                <button
                  key={cat}
                  onClick={() => handleSelectCategory(cat)}
                  aria-pressed={active}
                  className={`px-5 py-2 rounded-full font-semibold whitespace-nowrap transition-all duration-300 ${
                    active ? "bg-primary text-primary-foreground" : "bg-muted text-foreground hover:bg-primary hover:text-primary-foreground"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Menu Grid */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((dish) => (
              <DishCard key={dish.id} dish={dish} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
