export const SearchBar = ({ searchQuery, setSearchQuery, onSubmit }) => (
    <form action="/" method="get" onSubmit={onSubmit}>
        <label htmlFor="header-search">
            <span className="visually-hidden"></span>
        </label>
        <input
            type="text"
            id="header-search"
            placeholder="Search blog posts"
            name="s"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
        />
        <button type="submit">Search</button>
    </form>
);
