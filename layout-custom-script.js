const targetParent = document.querySelector('.portal-body-row');
const headerLinks =  Array.from(targetParent.getElementsByClassName('portal-single-publication'));

const targetContent = Array.from(targetParent.getElementsByClassName('publication-contents'));
targetContent.forEach(element => {

    element.style.display='none'    
});

headerLinks.forEach(element => {
    const link = element.querySelector('a');
    link.href = "#" ;
    

    link.addEventListener('click', ()=>(
        headerLinks.forEach(element => {
            element.querySelector('a').classList.remove('nav-little-arrow')
        }),
       
        
        targetContent.forEach(element => {   
            element.style.display='none';                            
                                      
        }),
        link.classList.add('nav-little-arrow'),        
        targetContent[headerLinks.indexOf(element)].style.display = 'block'       
        
    ))
                
    
});


const childArray = Array.from(document.getElementsByClassName('child-page'))

childArray.forEach(element => {
     
        const aTag = element.querySelector('a') 
        
        const linktext = aTag.innerHTML.toLowerCase().split(' ').join('-')
        const childPageContentId = ` #${linktext}-column`;      
        const childPageLink = aTag.href;
        const pathArray = childPageLink.split('/')
        const pathDir = pathArray[pathArray.length - 2]
        const pathHash = `/${pathDir}/`
        console.log(pathDir)

        const disabled = aTag.href ="#";

        element.addEventListener('click', ()=>{
        const ChildrenObjects = Array.from(document.querySelectorAll('.childrenContent'))
        $(element).innerHTML = ''; 
       
        if(ChildrenObjects.length > 0){            
            ChildrenObjects.forEach(childrenNode => {
                childrenNode.style.display='none';
           });
        }
            const externalContainerDiv = $('<div>').addClass('childrenContent');      
            // const injectableContent = $(externalContainerDiv).load(childPageLink + childPageContentId);      
            // $(element).append(injectableContent); 
            
            


            

            $.get(childPageLink, function( data ) {
                const htmlc = stringToHTML(data)
               constContentId = htmlc.querySelector(childPageContentId)
               const childrenLinks = Array.from(constContentId.querySelectorAll('a'))
               childrenLinks.forEach(childAnchor => {
                var link = childAnchor.href
                const anchor = getLinkArray(link)
                const anchorSlug = anchor[anchor.length - 1]
                const newLink = linkHash(childPageLink) + anchorSlug
                childAnchor.href = newLink    
                $(externalContainerDiv).append(childAnchor)           
                $(element).append(externalContainerDiv); 
               
               });               
                              
              
            });

            
         

            
           
        
       })    

     
});



var stringToHTML = function (str) {
	var parser = new DOMParser();
	var doc = parser.parseFromString(str, 'text/html');
	return doc.body;
};

function getLinkArray(link) {
    return link.split('/')
}
function linkHash(childPageLink) {
    const pathArray = getLinkArray(childPageLink);
    const pathDir = pathArray[pathArray.length - 2]   
    return `/${pathDir}/`
}




