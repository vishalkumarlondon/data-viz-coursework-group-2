// using d3 for convenience
var main = d3.select('main')//0
var scrolly = main.select('#scrolly');//0.1
var figure = scrolly.select("#map");//0.1.1
var article = scrolly.select('article');//0.1.2
var step = article.selectAll('.step');//0.1.2.X

// initialize the scrollama
const scroller = scrollama();
// token is restricted to the https://lobenichou.github.io/cuny-mbx-2019/ url.

// Replace with your own token.
const accessToken = 'pk.eyJ1IjoidmlzaGFsa3VtYXJsb25kb24iLCJhIjoiY2pmZHVmdG84MXM1YTJxbXM2d3RmbnBnNSJ9.bYO0LW7BJr8pzbYThWOrdw';

// Map style
const mapStyle = 'mapbox://styles/vishalkumarlondon/cjtuadgrx0ado1fp7eew091vk';

// access token
mapboxgl.accessToken = accessToken;

// map config
const map = new mapboxgl.Map({
    container: 'map',
    style: mapStyle,
    center: [-0.128435, 51.506938],
    zoom: 11.5
});

// function to reset map to original position
const mapReset = () => {
    map.easeTo({
        center: [-0.128435, 51.506938],
        zoom: 10
        // pitch: 0
    });
};

var chapters = {
    'baker': {
        bearing: 0,
        center: [-0.128435, 51.506938],
        zoom: 11.5
    },
    'aldgate': {
        duration: 6000,
        center: [-0.138,51.519],
        // bearing: 150,
        zoom: 15,
        pitch: 0
    },
    'london-bridge': {
        // bearing: 90,
        center: [-0.145,51.509],
        zoom: 13,
        speed: 0.6,
        pitch: 40
    },
    'woolwich': {
        // bearing: 90,
        center: [-0.126,51.511],
        zoom: 12.3
    },
    'gloucester': {
        // bearing: 45,
        center: [-0.183,51.496],
        zoom: 15.3,
        pitch: 20,
        speed: 0.5
    },
    'caulfield-gardens': {
        // bearing: 180,
        center: [-0.074,51.522],
        zoom: 12.3
    },
    'telegraph': {
        // bearing: 90,
        center: [-0.100, 51.503],
        zoom: 17.3,
        pitch: 40
    },
    'charing-cross': {
        // bearing: 90,
        center: [-0.021,51.478],
        zoom: 14.3,
        pitch: 20
    }
};

// generic window resize listener event
function handleResize() {
    // 1. update height of step elements
    var stepH = Math.floor(window.innerHeight * 0.75);
    step.style('height', stepH + 'px');

    var figureHeight = window.innerHeight * 0.7
    var figureMarginTop = (window.innerHeight - figureHeight) / 2

    figure
        .style('height', figureHeight + 'px')
        .style('top', figureMarginTop + 'px');

    // 3. tell scrollama to update new element dimensions
    scroller.resize();
}

// scrollama event handlers
function handleStepEnter(response) {
    // response = { element, direction, index }

    // add color to current step only
    step.classed('is-active', function (d, i) {
        return i === response.index;
    })
    const currentStep = response.element.id;
    const currentDirection = response.direction;
    console.log(currentStep, currentDirection)
    const directionIs = (index, direction) => {
        return currentStep === index && currentDirection === direction;
    };
    // update graphic based on step
    // if (directionIs("aldgate", "down") || directionIs("aldgate", "up")) {
    // 	map.flyTo(chapters[currentStep]);
    // } else if (directionIs("gloucester", "down")) {
    // 	mapReset();
    // }
    map.flyTo(chapters[currentStep]);
}

function setupStickyfill() {
    d3.selectAll('.sticky').each(function () {
        Stickyfill.add(this);
    });
}

function init() {
    setupStickyfill();

    // 1. force a resize on load to ensure proper dimensions are sent to scrollama
    handleResize();

    // 2. setup the scroller passing options
    // 		this will also initialize trigger observations
    // 3. bind scrollama event handlers (this can be chained like below)
    scroller.setup({
        step: '#scrolly article .step',
        offset: 0.33,
        debug: true,
    })
        .onStepEnter(handleStepEnter)


    // setup resize event
    window.addEventListener('resize', handleResize);

    //
    map.on("click", function (e) {
        console.log(e.lngLat);
    });
    // disable map zoom when using scroll
    map.scrollZoom.disable();
}

// kick things off
init();
