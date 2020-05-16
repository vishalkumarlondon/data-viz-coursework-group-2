        // Javascript code for the Scrollama and MapFlying!

        // Javascript inspired from the following :
        // 1. Scrollama GitHub: https://github.com/russellgoldenberg/scrollama
        // 2. ZhangZihao GitHub: https://github.com/zhangzihaoDT/scrollama-sticky-overlay
        // 3. Railways Viz Github: https://github.com/imakshayverma/railwaysafety/
        
        // Using d3 for convenience
		var main = d3.select('main')//0
		var scrolly = main.select('#scrolly');//0.1
		var figure = scrolly.select(".figure_mapbox");//0.1.1
		var article = scrolly.select('article');//0.1.2
        var step = article.selectAll('.step');//0.1.2.X
        
		// initialize the scrollama
        const scroller = scrollama();
        
		// AcessToken is restricted to the https://cultureincities.github.io/sport url.  
        // Replace with your own Mapbox token.
		const accessToken = 'pk.eyJ1IjoiYXZ1aWxsaSIsImEiOiJjazY1N3Q3MG4wOGFjM2tvNGo4aDlyamN5In0.sD99_EJ71yWj5o_Grdko0Q';
		// Map style - update if you create your own. This one is public and should work with your token
		const mapStyle = 'mapbox://styles/mapbox/light-v10';

        // ------------- PART 1 ------------- // 
        // Set the Map Style and the Map Flying chapters
		// Mapbox access token
		mapboxgl.accessToken = accessToken;

		// Mapbox map configuration - 1st sight of the map
		const map = new mapboxgl.Map({
			container: 'map',
			style: mapStyle,
			center: [-0.128435, 51.506938],
            zoom: 13.5,
            minZoom: 8,
            pitch: 0,
            bearing: 0
		});

		// Function to reset map to original position
		const mapReset = () => {
			map.easeTo({
				center: [-0.128435, 51.506938],
                zoom: 13.5,
                minZoom: 8,
                pitch: 0,
                bearing: 0
			});
        }; 

        // Map chapters - Flying around various location
        var chapters = {
            'intro': {
                center: [-0.128435, 51.506938],
                zoom: 13.5,
                minZoom: 8,
                pitch: 0,
                bearing: 0
            },
            'strand': {
                center: [-0.138,51.519],
                zoom: 13.6,
                pitch: 60,
                bearing: -50.0
            },
            'lavallee': {
                center: [-0.145,51.509],
                zoom: 13,
                pitch: 20,
                bearing: -35.0
            },
            'lesalpes': {
                center: [-0.126,51.511],
                zoom: 13.8,
                pitch: 30,
                bearing: -88.0
            }
        };

        // ------------- PART 2 ------------- // 
        // Set the Scrollama Functions 
		// Window resize listener event
		function handleResize() {
			// 1. update height of step elements
			var stepH = Math.floor(window.innerHeight * 0.75);
			step.style('height', stepH + 'px');

			var figureHeight = window.innerHeight * 0.7
			var figureMarginTop = (window.innerHeight - figureHeight) / 4

			figure
				.style('height', figureHeight + 'px')
				.style('top', figureMarginTop + 'px');

			// 3. tell scrollama to update new element dimensions
			scroller.resize();
        }    

		// Scrollama event handlers
		function handleStepEnter(response) {
            // response = { element, direction, index } 

			// Show only the current step 
			step.classed('is-active', function (d, i) {
				return i === response.index;
            })  

            const currentStep = response.element.id;
			const currentDirection = response.direction;
			console.log(currentStep, currentDirection)
			const directionIs = (index, direction) => {
				return currentStep === index && currentDirection === direction;
			};
			// Update graphic based on step
			if (directionIs("intro", "down") || directionIs("intro", "up")) {
			 	map.flyTo(chapters[currentStep]);
			 } else if (directionIs("lesalpes", "down")) {
			 	mapReset();
			}
			map.flyTo(chapters[currentStep]);
        }

		function setupStickyfill() {
			d3.selectAll('.sticky').each(function () {
				Stickyfill.add(this);
			});
		}

        // ------------- PART 3 ------------- // 
        // Define the map and the story chapters 
		function init() {

            map.on("load", function() {

                // Add the location of the venues ! 
                map.addSource('venues',{
                    'type':'geojson',
                    'data': 'https://vishalkumarlondon.github.io/fashion-week/data/places/fw19_foursquareapi_reponse_clean.geojson'      
                });
               
                map.addLayer({
                    id: 'venues-viz',
                    type: 'circle',
                    source:'venues',
                    paint:{
                      'circle-stroke-color':'#de5b91',
                      'circle-stroke-width':0.3,
                      'circle-color':'#de5b91'
                    }
                });  
           
                // Add the hashtags of the venues !
                map.addSource('social-media',{
                    'type':'geojson',
                    'data': 'https://vishalkumarlondon.github.io/fashion-week/data/social/fw2019_instagram_geospatial_clean.geojson'      
                });

                map.addLayer({
                    id: 'social-media',
                    source: 'social-media',
                    type: 'heatmap',
                    paint: {
                        'heatmap-radius': 10,
                        'heatmap-weight': 2,
                        'heatmap-color': [
                            'interpolate',
                            ['linear'],
                            ['heatmap-density'],
                            0,
                            'rgba(253,253,253,0)',
                            0.2,
                            'rgb(253,253,253)',
                            0.4,
                            'rgb(103,169,207)',
                            0.6,
                            'rgb(253,219,199)',
                            0.8,
                            'rgb(239,138,98)',
                            1,
                            'rgb(178,24,43)'
                            ]
                    },
                });

                map_airbnb.addSource('geo-communes',{
                    'type':'geojson',
                    'data': 'https://vishalkumarlondon.github.io/fashion-week/data/airbnb/Feb_London5.geojson'      
                 });  


                map_airbnb.addLayer({
                    'id': 'geo-communes-fill-viz',
                    'type': 'fill',
                    'source': 'geo-communes',
                    'paint': {
                      'fill-color': [
                      'interpolate',
                      ['linear'],
                      ['number',['get','value']],
                      0,'transparent',
                      20,'#daecf6',
                      40,'#aed0e3',
                      60,'#87b6d1',
                      80,'#649ebe',
                      100,'#4688ac',
                      200,'#2c7399',
                      400,'#175f87',
                      800,'#064e75'],
                      'fill-opacity': 0.8
                    }
                }); 

                map_airbnb.addLayer({
                    'id': 'geo-communes-line-viz',
                    'type': 'line',
                    'source': 'geo-communes',
                    'paint': {
                      'line-color': '#055e8e',
                      'line-width': 0.2
                    }
                }); 

                // map.moveLayer('venues-viz', 'social-media');

            
                
                // Create Empty Popup 
                var popup = new mapboxgl.Popup({
                    closeButton: false,
                    closeOnClick: false
                });
                
                // Change cursos to a pointer when the mouse is over venues layer!
                map.on('mouseenter', 'venues-viz', function(e) {
                    map.getCanvas().style.cursor = 'pointer';
                    
                    // Get the coordinates and the name of the venues locations
                    var coordinates = e.lngLat;
                    var description = e.features[0].properties.streetaddress;
                    // Set the empty popup and add it to the map
                    popup
                        .setLngLat(coordinates)
                        .setHTML('<h5>Venue Name: '+description+'</h5>')
                        .addTo(map);
                });

                // Change it back to when the mouse leaves, close the popup!
                map.on('mouseleave', 'venues-viz', function() {
                    map.getCanvas().style.cursor = '';
                    popup.remove();
                });
            });

			setupStickyfill();

			// Force a resize on load to ensure proper dimensions are sent to scrollama
			handleResize();

			// 2. setup the scroller passing options this will also initialize trigger observations
			// 3. bind scrollama event handlers (this can be chained like below)
			scroller.setup({
				step: '#scrolly article .step',
				offset: 0.30,
				debug: false,
			})
				.onStepEnter(handleStepEnter)

			// setup resize event
			window.addEventListener('resize', handleResize);

			// disable map zoom when using scroll
			map.scrollZoom.disable();
		}

		// kick things off
		init();
