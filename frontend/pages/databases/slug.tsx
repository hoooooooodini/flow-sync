import { useRouter } from 'next/router';

// Define the type for the NotionDatabase object
interface NotionDatabase {
  title: string;
  content: string;
}

// Mock data for the database, simulating a real database
const mockNotionDatabases: NotionDatabase[] = [
  { title: 'Project Management', content: 'Details of Project Management database, showing how to manage tasks, timelines, and deliverables.' },
  { title: 'Content Calendar', content: 'Details of Content Calendar database, managing editorial workflows and scheduling content.' },
  { title: 'Task Tracker', content: 'Details of Task Tracker database, keeping track of task completion status and priorities.' },
  { title: 'Research Notes', content: 'Details of Research Notes database, tracking research findings and annotations.' },
];

// Dynamic page to display Notion database content
const DatabasePage = () => {
  const router = useRouter();
  const { slug } = router.query;

  // Find the database by slug (assuming the slug is the title in lowercase with hyphens)
  const database = mockNotionDatabases.find(db => db.title.toLowerCase().replace(/ /g, '-') === slug);

  if (!database) {
    return <p>Database not found</p>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">{database.title}</h1>
      <p className="text-lg">{database.content}</p>
    </div>
  );
};

export default DatabasePage;
