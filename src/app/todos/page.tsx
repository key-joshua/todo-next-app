import { authOptions } from '@/libs/auth';
import { redirect } from 'next/navigation';
import View from '@/components/table/View';
import { getServerSession } from 'next-auth';

const Todos = async () => {
    const session = await getServerSession(authOptions);
    if (!session) return redirect('/');

    return (
        <main className="w-full py-8 flex flex-col items-center">
            <h1 className="card-title mx-auto font-extrabold">  TODO TASKS </h1>
            <table className="w-5/6 border-collapse">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="text-left py-4 pl-6 rounded-tl-lg">Tasks</th>
                        <th className="text-right py-4 pr-6 rounded-tr-lg">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <View />
                </tbody>
            </table>
        </main>
    )
}

export default Todos;
