import DataManager from '../../components/DataManager';

export const dynamic = 'force-dynamic';

export default function DataPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <DataManager />
      </div>
    </div>
  );
} 