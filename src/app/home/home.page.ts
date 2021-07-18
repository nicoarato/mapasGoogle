/* eslint-disable space-before-function-paren */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';

declare let google: any;

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    map: any;

    // eslint-disable-next-line @typescript-eslint/member-ordering
    @ViewChild('map', { read: ElementRef, static: false }) mapRef: ElementRef;

    // file = '../assets/pac_202104.json';
    file = '../assets/geojson2021-05.json';
    infoWindows: any = [];
    markers = [];

    markers1: any = [

        {
            type: 'Feature',
            properties: {
                red: 6001,
                subagente: 0,
                permiso: 6001,
                titular: 'AGENCIA MINES S.R.L.',
                promedio_ventas_3mes: 1201510,
                estado_comercial: 'activo'
            },
            geometry: {
                type: 'Point',
                coordinates: [-60.704666, -31.640020]
            }
        },
        {
            type: 'Feature',
            properties: {
                red: 6001,
                subagente: 2,
                permiso: 56922,
                titular: 'LANCILLA, MIGUEL ALEJANDROdd',
                promedio_ventas_3mes: 252493,
                estado_comercial: 'activo'
            },
            geometry: {
                type: 'Point',
                coordinates: [-60.7058219, -31.6433086]
            }
        },
        {
            type: 'Feature',
            properties: {
                red: 6001,
                subagente: 3,
                permiso: 56850,
                titular: 'CASLINI, .DANIEL C�SAR',
                promedio_ventas_3mes: 247792,
                estado_comercial: 'activo'
            },
            geometry: {
                type: 'Point',
                coordinates: [-60.6865348, -31.6209716]
            }
        },
        {
            type: 'Feature',
            properties: {
                red: 6001,
                subagente: 4,
                permiso: 6078,
                titular: 'PACHIAROTTA MARIA ROSA  ',
                promedio_ventas_3mes: 199735,
                estado_comercial: 'activo'
            },
            geometry: {
                type: 'Point',
                coordinates: [-60.7207679, -31.6404438]
            }
        }
    ];

    constructor() {

    }

    ionViewDidEnter() {
        this.showMap();
        const geocoder = new google.maps.Geocoder();

        (document.getElementById('submit') as HTMLButtonElement)
            .addEventListener('click', () => {
                this.geocodeAddress(geocoder, this.map);
            }
            );
    }

    addMarkersToMap(markers) {
        for (const marker of markers) {

            // const svgMarker = {
            //     // eslint-disable-next-line max-len
            // eslint-disable-next-line max-len
            //     path: 'M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z',
            //     // fillColor: '#42d77d',
            //     fillColor: 'black',
            //     fillOpacity: 1,
            //     strokeWeight: 0,
            //     rotation: 0,
            //     scale: 2,
            //     anchor: new google.maps.Point(15, 30),
            // };

            const position = new google.maps.LatLng(marker.geometry.coordinates[1], marker.geometry.coordinates[0]);
            const infowindow = new google.maps.InfoWindow();
            const formatterPeso = new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: 'COP',
                minimumFractionDigits: 0
            });
            // const recaudacion = formatterPeso.format(parseInt(punto.properties.promedio_ventas_3mes));
            const recaudacion = formatterPeso.format(marker.properties.promedio_ventas_3mes);
            const labelMarker =
                `<div class='popup'>
                <p class='titulo'> <strong>${marker.properties.red}/${marker.properties.subagente} - ${recaudacion}</strong></p>
                </div>`;


            const mapMarker = new google.maps.Marker({
                position,
                map: this.map,
                // collisionBehavior:
                //     google.maps.CollisionBehavior.OPTIONAL_AND_HIDES_LOWER_PRIORITY,
                // animation: google.maps.Animation.DROP,
                // animation: google.maps.Animation.DROP,
                // draggable: true,
                title: `${marker.properties.titular}`,
                // icon: svgMarker


            });

            google.maps.event.addListener(mapMarker, 'click', function (e) {
                infowindow.setContent(labelMarker);
                infowindow.open(this.map, mapMarker);
            });
        }
    }

    async showMap() {
        const location = new google.maps.LatLng(-31.635150549331115, -60.71562051773071);
        const options = {
            visibility: 'off',
            center: location,
            zoom: 14,
            // disableDefaultUI: true
            // zoomControl: boolean,
            mapTypeControl: false,
            // scaleControl: false,
            // streetViewControl: false,
            // rotateControl: false
            // fullscreenControl: false
            // ---------------------------
            mapTypeControlOptions: {
                mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain'],
            },

        };
        this.map = new google.maps.Map(this.mapRef.nativeElement, options);
        console.log('Agregando');
        this.markers = await this.cargarArchivo(this.file);
        // console.log(this.markers.length);
        // console.log(this.markers);
        this.addMarkersToMap(this.markers);

    }

    geocodeAddress(geocoder, resultsMap) {
        const address = (document.getElementById('address') as HTMLInputElement).value;
        geocoder.geocode({ address }, (results, status) => {
            const infowindow = new google.maps.InfoWindow();
            const labelMarker = `<p><strong>Dom propuesto</strong></p>`;
            if (status === 'OK') {
                resultsMap.setCenter(results[0].geometry.location);
                const svgMarker = {
                    // eslint-disable-next-line max-len
                    path: 'M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z',
                    fillColor: 'black',
                    fillOpacity: 0.9,
                    strokeWeight: 0.5,
                    rotation: 0,
                    scale: 2,
                    anchor: new google.maps.Point(15, 30),
                };

                const mapMarker = new google.maps.Marker({
                    map: resultsMap,
                    position: results[0].geometry.location,
                    draggable: true,
                    icon: svgMarker

                });
                google.maps.event.addListener(mapMarker, 'click', function (e) {
                    infowindow.setContent(labelMarker);
                    infowindow.open(this.map, mapMarker);
                });
            } else {
                alert('Debes ingresar una dirección: ' + status);
            }
        });
    }

    async cargarArchivo(file) {
        const marcadores = await fetch(file)
            .then(response => response.json())
            .catch(error => {
                console.log(error);
            });
        // console.log(marcadores.features);
        return marcadores.features;

    }


}


