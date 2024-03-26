import Edit from '@/components/svg/Edit';
import { authOptions } from '@/libs/auth';
import Delete from '@/components/svg/Delete';
import { getServerSession } from 'next-auth';

interface ElementType {
    id: number;
    name: string;
    description: string;
}

const getData = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todos`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const responseData = await response.json();
    if (response.ok) {
        return responseData.data;
    } else {
        console.log(responseData.error);
    }
}

const Todos = async () => {
    const session = await getServerSession(authOptions);
    if (!session) return window.location.replace('/');
    const data = await getData();

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
                    {
                        data.map((element: ElementType) => (
                            <tr key={element?.id} className="">
                                <td className="py-4 pl-6 flex space-x-4">
                                    <input type="checkbox" className="mr-2" />
                                    <p> {element?.name}  </p>
                                    <p className="text-gray-800"> | {element?.description} </p>
                                </td>
                                <td className="py-4 pr-6">
                                    <div className="w-full flex justify-end space-x-4">
                                        <Edit />
                                        <Delete id={element?.id} />
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </main>
    )
}

export default Todos;
