$(document).ready(function() {
    let movies = [];

    // Add a movie to the list
    $('#movie-form').on('submit', function(event) {
        event.preventDefault();
        const name = $('#movie-name').val();
        const genre = $('#movie-genre').val();
        movies.push({ name, genre });
        updateMovieList();
        this.reset();
    });

    // Update the movie list table
    function updateMovieList() {
        const $movieList = $('#movie-list');
        $movieList.empty();
        movies.forEach((movie, index) => {
            const row = `
                <tr>
                    <td>${movie.name}</td>
                    <td>${movie.genre}</td>
                    <td>
                        <button class="btn btn-danger delete" data-index="${index}">Delete</button>
                    </td>
                </tr>
            `;
            $movieList.append(row);
        });
    }

    // Delete a movie from the list
    $('#movie-list').on('click', '.delete', function() {
        const index = $(this).data('index');
        movies.splice(index, 1);
        updateMovieList();
    });

    // Sort the movie list
    $('.sort').on('click', function() {
        const sortField = $(this).data('sort');
        movies.sort((a, b) => a[sortField].localeCompare(b[sortField]));
        updateMovieList();
    });

    // Live search filter
    $('#search').on('input', function() {
        const query = $(this).val().toLowerCase();
        $('#movie-list tr').each(function() {
            const name = $(this).find('td').eq(0).text().toLowerCase();
            const genre = $(this).find('td').eq(1).text().toLowerCase();
            $(this).toggle(name.includes(query) || genre.includes(query));
        });
    });

    // dark mode
    $('#dark-mode-toggle').on('click', function() {
        $('body').toggleClass('dark-mode');
    });

    // Show pop up on image click
    $('#movie-carousel .carousel-item img').on('click', function() {
        const imgSrc = $(this).attr('src');
        $('#modalImage').attr('src', imgSrc);
        $('#imageModal').modal('show');
    });
});
// Show pop up on avatar image click
$('.avatar').on('click', function() {
    const imgSrc = $(this).attr('src');
    $('#modalAvatarImage').attr('src', imgSrc);
    $('#avatarModal').modal('show');
});

