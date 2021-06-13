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

    file = '../assets/pac_202104.json';
    infoWindows: any = [];

    markers: any = [
        {
            red: 6001,
            subagente: 0,
            permiso: 6001,
            titular: 'AGENCIA MINES S.R.L.',
            promedio_ventas_3mes: 1201510,
            estado_comercial: 'activo',
            coordinates: [-60.704666, -31.640020]
        },
        {
            red: 6001,
            subagente: 2,
            permiso: 56922,
            titular: 'LANCILLA, MIGUEL ALEJANDROdd',
            promedio_ventas_3mes: 252493,
            estado_comercial: 'activo',
            coordinates: [-60.7058219, -31.6433086]
        },
        {
            red: 6001,
            subagente: 3,
            permiso: 56850,
            titular: 'CASLINI, .DANIEL C�SAR',
            promedio_ventas_3mes: 247792,
            estado_comercial: 'activo',
            coordinates: [-60.6865348, -31.6209716]
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

            const svgMarker = {
                // eslint-disable-next-line max-len
                path: 'M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z',
                // fillColor: '#42d77d',
                fillColor: 'black',
                fillOpacity: 1,
                strokeWeight: 0,
                rotation: 0,
                scale: 2,
                anchor: new google.maps.Point(15, 30),
            };
            const position = new google.maps.LatLng(marker.coordinates[1], marker.coordinates[0]);
            const infowindow = new google.maps.InfoWindow();
            const formatterPeso = new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: 'COP',
                minimumFractionDigits: 0
            });
            // const recaudacion = formatterPeso.format(parseInt(punto.properties.promedio_ventas_3mes));
            const recaudacion = formatterPeso.format(marker.promedio_ventas_3mes);
            const labelMarker =
                `<div class="popup">
                <p class="titulo"> <strong>${marker.red}/${marker.subagente} - ${recaudacion}</strong></p>
                </div>`;


            const mapMarker = new google.maps.Marker({
                position,
                map: this.map,
                animation: google.maps.Animation.DROP,
                title: `${marker.titular}`,
                icon: svgMarker
            });

            google.maps.event.addListener(mapMarker, 'click', function (e) {
                infowindow.setContent(labelMarker);
                infowindow.open(this.map, mapMarker);
            });
        }
    }

    showMap() {
        const location = new google.maps.LatLng(-31.635150549331115, -60.71562051773071);
        const options = {
            center: location,
            zoom: 14,
            // disableDefaultUI: true
            // zoomControl: boolean,
            mapTypeControl: false,
            // scaleControl: false,
            // streetViewControl: false,
            // rotateControl: false
            // fullscreenControl: false

        };
        this.map = new google.maps.Map(this.mapRef.nativeElement, options);
        this.addMarkersToMap(this.markers);
    }

    geocodeAddress(geocoder, resultsMap) {
        const address = (document.getElementById('address') as HTMLInputElement).value;
        geocoder.geocode({ address }, (results, status) => {
            if (status === 'OK') {
                resultsMap.setCenter(results[0].geometry.location);
                new google.maps.Marker({
                    map: resultsMap,
                    position: results[0].geometry.location,
                });
            } else {
                alert('Debes ingresar una dirección: ' + status);
            }
        });
    }



}


