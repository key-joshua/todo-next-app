import Edit from './Edit';
import Delete from './Delete';
import { TodoType } from '@/types/Types';

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

const View = async () => {
    const data = await getData();

    return (
        <>
            {
                data.map((element: TodoType) => (
                    <tr key={element?.id} className=''>
                        <td className='py-4 pl-6 flex space-x-4'>
                            <input type='checkbox' className='mr-2' />
                            <p> {element?.name}  </p>
                            <p className='text-gray-800'> | {element?.description} </p>
                        </td>
                        <td className='py-4 pr-6'>
                            <div className='w-full flex justify-end space-x-4'>
                                <Edit />
                                <Delete id={element?.id} />
                            </div>
                        </td>
                    </tr>
                ))
            }
        </>
    )
}

export default View