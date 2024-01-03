import { getImageUrl } from "./utils";

Avatar.defaultProps = {
    person: {
        name: 'Unknown',
        imageId: 'defaultImageId',
    },
    size: 50,
};

export default function Avatar({
    person, size, awards, discovered // props를 받음
}: {
    person?: {
        name?: string;
        imageId?: string;
        profession?: string;
    };
    size?: number;
    awards?: string;
    discovered?: string;
}) {
    const image_size = size && size > 90 ? 'b' : 's';

    return (
        <section className="profile">
            <h2>{person?.name}</h2>
            <img
                className="avatar"
                src={getImageUrl(person, image_size)}
                alt={person?.name || 'unknown'}
                width={size}
                height={size}
            />
            <ul>
                <li>
                    <b>Professions: </b>
                    {person?.profession}
                </li>
                <li>
                    <b>Awards: {awards?.split(',').length}</b>
                    ({awards})
                </li>
                <li>
                    <b>Discoverd: </b>
                    {discovered}
                </li>
            </ul>
        </section>

    );
}