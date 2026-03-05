// ApplicationsList.tsx  (or PremiumMember.tsx)
import  { useState } from "react";
import Title from "../Title";
import toast from "react-hot-toast";
import ApplicationItem from "../Applications/AppicationItem";

interface Application {
  id: number;
  name: string;
  studio: string;
  time: string;
  status: string;
  fileLink?: string;
}

export default function ApplicationsList() {
  // Real state diye data manage korbo
  const [applications, setApplications] = useState<Application[]>([
    {
      id: 1,
      name: "Marie Dubois",
      studio: "Studio Châtelet",
      time: "2 hours ago",
      status: "New",
      fileLink: "https://example.com/marie.pdf",
    },
    {
      id: 2,
      name: "Alexandre Leroy",
      studio: "Studio Montmartre",
      time: "5 hours ago",
      status: "New",
      fileLink: "https://example.com/alex.pdf",
    },
    {
      id: 3,
      name: "Sophie Martin",
      studio: "Studio Bastille",
      time: "1 day ago",
      status: "Pending",
      fileLink: "https://example.com/sophie.pdf",
    },
    {
      id: 4,
      name: "Jean Dupont",
      studio: "Studio République",
      time: "2 days ago",
      status: "New",
      fileLink: "https://example.com/jean.pdf",
    },
  ]);

  // Accept → status change + toast
  const handleAccept = (id: number, name: string) => {
    setApplications(prev =>
      prev.map(app =>
        app.id === id ? { ...app, status: "Accepted" } : app
      )
    );
    toast.success(`${name} accepted!`, {
      icon: "Success",
      style: { background: "#10b981", color: "white" },
    });
  };

  // Reject → status change
  const handleReject = (id: number, name: string) => {
    setApplications(prev =>
      prev.map(app =>
        app.id === id ? { ...app, status: "Rejected" } : app
      )
    );
    toast.error(`${name} rejected`, {
      icon: "Error",
    });
  };

  // Delete → real remove from list
  const handleDelete = (id: number, name: string) => {
    if (window.confirm(`Permanently delete ${name}'s application?`)) {
      setApplications(prev => prev.filter(app => app.id !== id));
      toast.success(`${name}'s application deleted`, {
        icon: "Trash",
      });
    }
  };

  return (
    <div className="">
      <Title
        title="Applications"
        paragraph="Manage all applications with one click"
      />

      <div className="mt-8 space-y-6">
        {applications.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p className="text-xl">No applications found</p>
          </div>
        ) : (
          applications.map((app) => (
            <ApplicationItem
              key={app.id}
              id={app.id}                    // ID pass kora holo
              name={app.name}
              studio={app.studio}
              time={app.time}
              status={app.status}
              fileLink={app.fileLink}
              onAccept={() => handleAccept(app.id, app.name)}
              onReject={() => handleReject(app.id, app.name)}
              onDelete={() => handleDelete(app.id, app.name)}
            />
          ))
        )}
      </div>
    </div>
  );
}