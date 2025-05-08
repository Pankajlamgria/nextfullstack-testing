
export default async function UserProfile({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    return (
        <div>
            <h2>This is profile inside id</h2>
            <span>This is the ID:</span> <span >{id}</span>
        </div>
    );
}
