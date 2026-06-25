import ClientPageWrapper from "./ClientPageWrapper";


interface EditProjectProps {
    params: Promise<{ id: string }>;
}

async function EditProject({ params }: EditProjectProps) {
    const { id } = await params;
    const projectId = Number(id);

    return (
        <ClientPageWrapper projectId={projectId} />   
    )
}


export default EditProject;