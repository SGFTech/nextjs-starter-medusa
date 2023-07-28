import parse from "html-react-parser";
type Props = {
    description: Record<string, any>;
    specifiedKeys?: string[];
};
/**
 * defines the sequence alse
 */
const allowedKeys = [
    "short_description",
    "condition",
    "appearance",
    "how_to_use",
    "solubility",
    "best_before",
    "country_of_origin",
    "manufacturer_brand",
    "processor_benefits",
    "storage_conditions",
    "technical_data_sheet"
];

const AllDetails: React.FC<{
    index: number;
    key: string;
    keyTitle: string;
    description: Record<string, any>;
}> = ({ index, key, keyTitle, description }) => {
    if (index % 2 == 0) {
        return (
            <tr
                key={key}
                className="border-b bg-white dark:border-gray-700 dark:bg-gray-900"
            >
                <td>
                    <b>{keyTitle}</b>
                </td>
                <td className="whitespace-pre-line">
                    {parse(description[key as any] as string)}
                </td>
            </tr>
        );
    } else {
        return (
            <tr
                key={key}
                className="border-b bg-gray-50 dark:border-gray-700 dark:bg-gray-800"
            >
                <td>
                    <b>{keyTitle}</b>
                </td>
                <td className="whitespace-pre-line">
                    {parse(description[key as any] as string)}
                </td>
            </tr>
        );
    }
};

const OnlyOneField: React.FC<{
    key: string;
    description: string;
}> = ({ key, description }) => {
    return (
        <>
            <tr className=" bg-white  dark:bg-gray-900">
                <td>
                    <b>About</b>
                </td>
            </tr>
            <tr key="0" className=" bg-white  dark:bg-gray-900">
                <td className="whitespace-pre-line">
                    {parse(description as string)}
                </td>
            </tr>
        </>
    );
};

const DescriptionTable: React.FC<Props> = ({ description, specifiedKeys }) => {
    const originalkeys = Object.keys(description);

    const keys = allowedKeys.filter((key) => originalkeys.includes(key));

    let DisplayData = keys.map((key, index) => {
        const keyTitle = key
            .split("_")
            .map((word) => word[0].toUpperCase() + word.substring(1))
            .join(" ");
        if (!allowedKeys.includes(key)) return;
        if ((specifiedKeys && !specifiedKeys.includes(key)) || !key) return;
        if (specifiedKeys?.length == 1) {
            return OnlyOneField({
                key,
                description: description[key] as string
            });
        } else {
            return AllDetails({ index, key, keyTitle, description });
        }
    });
    DisplayData = DisplayData.filter((d) => d != undefined);
    return (
        <div>
            <div className="flex flex-col overflow-x-auto">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="min-w-full table-auto text-left text-sm text-gray-500 dark:text-gray-400">
                            <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th> </th>
                                    <th> </th>
                                </tr>
                            </thead>
                            <tbody>{DisplayData}</tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DescriptionTable;
