function Filters(props) {
    const uniqueTags = Array.from(
        new Set(
            (props.tasks || [])
                .filter((task) => task.tags && task.tags.length > 0)
                .flatMap((task) => task.tags)
        )
    );

    return (
        <div>
            <label htmlFor="filter">Filter</label>
            <select name="filter" id="filter" onChange={props.filterTasks}>
                <option value="All">All Items</option>
                {uniqueTags.map(
                    (tag, index) =>
                        // Add a check for a non-empty string before rendering the option
                        tag.trim() !== "" && (
                            <option key={index} value={tag}>
                                {tag}
                            </option>
                        )
                )}
            </select>
        </div>
    );
}

export default Filters;
