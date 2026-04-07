import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import TourService from "../../services/TourService";

interface Schedule {
  id: number;
  tour_id: number;
  day_number: number;
  title: string;
  activity: string;
}

export default function TourScheduleList() {
  const { id } = useParams(); // tour id
  const navigate = useNavigate();

  const [tourName, setTourName] = useState("");
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchSchedules();
      fetchTour();
    }
  }, [id]);

  async function fetchTour() {
    try {
      const tour = await TourService.getTour(Number(id));
      setTourName(tour.name);
    } catch (error) {
      console.error("Load tour failed:", error);
    }
  }

  async function fetchSchedules() {
    try {
      const data = await TourService.getSchedulesByTour(Number(id));
      setSchedules(data);
    } catch (error) {
      console.error("Load schedules failed:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(scheduleId: number) {
    if (!confirm("Delete this schedule?")) return;

    try {
      await TourService.deleteSchedule(scheduleId);

      setSchedules(schedules.filter((schedule) => schedule.id !== scheduleId));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  }

  if (loading) return <p className="p-6 space-y-6 max-w-5xl mx-auto">Loading schedules...</p>;

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <div className="flex justify-between mb-6 items-center">
        <h1 className="text-2xl font-bold text-gray-800">Tour Schedule: {tourName}</h1>

        <div className="flex gap-2">
          <Link
            to={`/admin/tours/${id}/schedules/create`}
            className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/20"
          >
            + Add Schedule
          </Link>

          <button
            type="button"
            onClick={() => navigate('/admin/tours')}
            className="bg-gray-100 text-gray-600 px-5 py-2.5 rounded-xl font-medium hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"><table className="w-full">
        <thead><tr className="bg-gray-50/80 text-[11px] uppercase tracking-wider font-semibold text-gray-400">
            <th className="px-5 py-3.5 text-left border-none">Day</th>
            <th className="px-5 py-3.5 text-left border-none">Title</th>
            <th className="px-5 py-3.5 text-left border-none">Activity</th>
            <th className="px-5 py-3.5 text-left border-none">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-50">
          {schedules.map((schedule) => (
            <tr key={schedule.id} className="hover:bg-gray-50/50 transition-colors">
              <td className="px-5 py-4 text-sm text-gray-600 border-none">Day {schedule.day_number}</td>

              <td className="px-5 py-4 text-sm text-gray-600 border-none">{schedule.title}</td>

              <td className="px-5 py-4 text-sm text-gray-600 border-none">{schedule.activity}</td>

              <td className="px-5 py-4 text-sm text-gray-600 border-none flex gap-2">
                <Link
                  to={`/admin/tours/${id}/schedules/edit/${schedule.id}`}
                  className="bg-amber-50 text-amber-600 px-3 py-1.5 rounded-lg font-medium hover:bg-amber-100 transition-colors text-xs"
                >
                  Edit
                </Link>

                <button
                  onClick={() => handleDelete(schedule.id)}
                  className="bg-red-50 text-red-600 px-3 py-1.5 rounded-lg font-medium hover:bg-red-100 transition-colors text-xs"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {schedules.length === 0 && (
            <tr>
              <td colSpan={4} className="text-center p-4">
                No schedules found.
              </td>
            </tr>
          )}
        </tbody>
      </table></div>
    </div>
  );
}
