function searchForm(){
    // code here    
    let results = [];
    let btnSearch = document.getElementById("searchButton"),
    	inputSearch = document.getElementById("searchInput"),
    	disableSearchButton = true;


    let getBookSchema = () => {
    	let searchInput,
    		awesomemplete; 
		searchInput= document.getElementById("searchInput");
		awesomemplete = new Awesomplete(searchInput, { maxItems: 7 } );

		loadJSON("books-schema.json", res => {			    	
	    	awesomemplete.list = _.pluck(res.data, 'title')			
		});
    }

    /**
    * @param {Object} book: book that will be rendered
    * @return {Object} item
    */
    let getListItem = (book) => {
    	let item = $("<article>").addClass("listItem pure-u-1-3"),
    		img = $("<img>").addClass("pure-img");
    		h2 = $("<h2>").addClass("title"),
    		p = $("<p>").addClass("description");

    	h2.text(book.title);
    	p.text(book.teaser);    	
    	img.attr("src", book.image ? book.image : "");

    	item.append(img)
    		.append(h2)
    		.append(p);

    	return item;
    }

    /**
    *
    */
    let onKeyUp = (evt) => {
    	if (evt.target.value.length >= 2) {    		
    		btnSearch.disabled = false;    		
    		if (evt.keyCode == 13) {
    			search();
    		}
    	} else {
    		btnSearch.disabled = true;    		
    	}
    }

    /**
    * Search for results
    */
    let search = () => {
    	let keyword = inputSearch.value;
    	let results = [];    			

    	loadJSON("books-schema.json", (books) => {//we can add variables like the limit of results, the backend should support these queries

    		results = _.filter(books.data, (book) => {
    			return book.title.toUpperCase().includes(keyword.toUpperCase());
    			});

    		results = results.slice(0, MAX_RESULTS_SIZE);//filter the top 9 results
    		
    		renderResults(results);
		});
    }

    /**
    * Display search results
    */
    let renderResults = (results) => {
    	let resultContent = $("#searchResults");
    	resultContent.children().remove();

    	_.each(results, (result) => {
    		resultContent.append(getListItem(result));
    	});    	
    }

    /* */
    btnSearch.addEventListener("click", search);

    inputSearch.addEventListener("keyup", onKeyUp);

    getBookSchema();


}
