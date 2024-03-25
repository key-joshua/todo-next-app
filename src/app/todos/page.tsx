import { authOptions } from '@/libs/auth';
import { getServerSession } from 'next-auth';

const Todos = async () => {
    const session = await getServerSession(authOptions);
    if(!session) return window.location.replace('/');

    return (
        <main className="max-w-4xl mx-auto mt-4">
            <div className="text-center my-5 flex flex-col gap-4">
                <h1 className="text-2xl font-bold">TASK LIST</h1>
            </div>
            <div className="text-center"> DIV SECTION</div>
        </main>
    )
}

export default Todos;
