import SettingsForm from "@/components/admin/forms/SettingsForm";
import dbConnect from "@/lib/mongodb";
import HomeStat from "@/models/HomeStat";

export const metadata = {
  title: "Site Settings | Workspace",
};

export default async function SettingsPage() {
  await dbConnect();
  
  const statsData = await HomeStat.findOne({}).lean();
  
  // Transform ObjectId to string or use sensible defaults if not exists
  const initialData = statsData ? {
    cleaningsDone: statsData.cleaningsDone,
    happyClientsPercentage: statsData.happyClientsPercentage,
    proCleaners: statsData.proCleaners,
    averageRating: statsData.averageRating,
    facebookUrl: statsData.facebookUrl,
    twitterUrl: statsData.twitterUrl,
    instagramUrl: statsData.instagramUrl,
    linkedinUrl: statsData.linkedinUrl,
  } : {
    cleaningsDone: 5000,
    happyClientsPercentage: 99,
    proCleaners: 50,
    averageRating: 4.9,
    facebookUrl: "",
    twitterUrl: "",
    instagramUrl: "",
    linkedinUrl: "",
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="border-b border-slate-800 pb-6">
        <h1 className="text-3xl font-bold font-serif text-white tracking-tight">Site Settings</h1>
        <p className="text-slate-400 mt-2">Manage your public counters and social media links.</p>
      </div>

      <div className="bg-slate-900/50 backdrop-blur-sm rounded-3xl shadow-xl shadow-black/20 border border-slate-800 p-6 md:p-8">
        <SettingsForm initialData={initialData} />
      </div>
    </div>
  );
}
