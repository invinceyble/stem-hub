

function genTile(article) {
  
   const tileVariation = Math.floor(Math.random() * (6 - 1)) + 1
   const tilesizeVariation = ["big","small","2xbig"]
   const numberofupvotes = Math.floor(Math.random() * (100 - 1)) + 1
   
   const randomTileSize = function() {
     return tilesizeVariation[Math.floor(Math.random() * tilesizeVariation.length)]
   }
   
   
   let html = `<div class="col1 clearfix">
        <li class="tile tile-big tile-${tileVariation} slideTextUp" data-page-type="r-page" data-page-name="random-r-page">
          <div><p>${article.title}</p></div>
          <div><a href="${article.url}"><p>10 Upvotes 🤯</p></a></div>
        </li>
      </div>`
   if (article.og) {
        if(article.og.ogImage) {
          return `<div class="col3 clearfix">      
        <li class="tile tile-2xbig fig-tile slideTextUp" data-page-type="custom-page" data-page-name="random-r-page">
          <figure>
            <img src="${article.og.ogImage.url}" />
          
            <figcaption class="tile-caption caption-bottom tile-${tileVariation}">
               ${article.title}
            <figcaption class="tile-caption caption-left tile-11">
            <a href="${article.url}">Read more</a>
              <br />
            <span id="karma-${article.objectID}">${article.karma !== undefined ? article.karma : 0}</span> points
            
              <a onclick="upvote(${article.objectID})" class="upvote-button s-upvote-button" data-article="${article.objectID}"> 💖 </a>
            </figcaption>
            </figure>
        </li>
      </div>`
          
        }
   }
  
  else {
    return html
  }
  
  return html
  
  

}


function upvote(id) {
  
  $('#karma-' + id).text(parseInt($('#karma-' + id).text()) + 1)
  
  $.post( "/upvote", {id: id} )
  .done(function(data) {
    console.log(data)
  })
  
}

$(function() {
  console.log('hello world :o');
  
   
  
  // var client = algoliasearch("YSR2YTDYP9", "b97f5e3ae9455387f13aea017f7f50d0");
  // var index = client.initIndex('coolthings');
  
//   index.search(
//   {hitsPerPage: 50,},
//   function searchDone(err, content) {
//     if (err) {
//       console.error(err);
//       return;
//     }

//     for (var h in content.hits) {
//       console.log(
//         content.hits[h]
//       );
      
//       const article = content.hits[h]
     
      
//       let html = genTile(article)
  
//}
      
  
  var search = instantsearch({
        appId: 'YSR2YTDYP9',
        apiKey: 'b97f5e3ae9455387f13aea017f7f50d0',
        indexName: 'coolthings'
      });
  
      search.addWidget(
        instantsearch.widgets.searchBox({
          container: '#search',
          placeholder: 'Search for articles!'
        })
      );

      search.addWidget(
        instantsearch.widgets.hits({
          container: '#articles',
          templates: {
            item: genTile
          }
        })
      );
  
  search.addWidget(
        instantsearch.widgets.pagination({
          container: '#pagination-container'
        })
      );
  
   search.start();
    
  
$('.upvote-button .s-upvote-button').click(function() {
  
  console.log('test')
  
})
  

});
