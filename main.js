
// Load the Map and MapView modules
require([
    "esri/config",
    "esri/WebMap",
    "esri/views/MapView",
    "esri/widgets/Legend",
    "esri/widgets/ScaleBar",
    "esri/widgets/BasemapGallery",
    "esri/widgets/Expand",
    "esri/core/reactiveUtils",
    "esri/widgets/Home",
    "esri/widgets/Locate",
    "esri/widgets/LayerList"
], function (esriConfig,
    WebMap, MapView, Legend, ScaleBar, BasemapGallery, Expand, reactiveUtils, Home, Locate,LayerList) {

    esriConfig.portalUrl = "https://cgi.nlcs.gov.bt/portal"
    // Create a Map instance
    const myMap = new WebMap({
        portalItem: {
            id: "cd3fb2bc5fb64a3eb00c610eb27824c1"
        }
        // basemap: "hybrid"
    });
    // Create a MapView instance (for 2D viewing) and reference the map instance
    const view = new MapView({
        map: myMap,
        // zoom: 14,
        container: "viewDiv",
        center: [89.6386, 27.4716]

    });
    //     let legend = new Legend({
    //   view: view
    // });

    // view.ui.add(legend, "bottom-right");

    let scaleBar = new ScaleBar({
        view: view
    });
    view.ui.add(scaleBar, "bottom-left"
    );

    const basemapGallery = new BasemapGallery({
        view: view,
        container: document.createElement("div")
    });

    // Create an Expand instance and set the content
    // property to the DOM node of the basemap gallery widget
    // Use an Esri icon font to represent the content inside
    // of the Expand widget

    const bgExpand = new Expand({
        view: view,
        content: basemapGallery
    });

    // close the expand whenever a basemap is selected
    // on mobile devices
    reactiveUtils.watch(
        () => basemapGallery.activeBasemap,
        () => {
            const mobileSize = view.heightBreakpoint === "xsmall" || view.widthBreakpoint === "xsmall";

            if (mobileSize) {
                bgExpand.collapse();
            }
        }
    );
    // Add the expand instance to the ui

    view.ui.add(bgExpand, "top-right");
    let locateWidget = new Locate({
        view: view,
    });
    view.ui.add(locateWidget, "top-left");

    const homeBtn = new Home({
        view: view
    });
    view.ui.add(homeBtn, "top-left");

    const legend = new Legend({
        view: view,
        container: "legend-container"
    });
    
    const layerList = new LayerList({
        view: view,
        container: 'layerList-container'
    });
    // MODALS //
const appDetailModalBtn = document.getElementById("app-details-action");
const appDetailModalEl = document.getElementById("app-details-modal");
appDetailModalBtn.addEventListener("click", () => { appDetailModalEl.open = true });
});