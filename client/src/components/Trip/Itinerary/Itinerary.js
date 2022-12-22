import React from 'react';
import { useToggle } from '../../../hooks/useToggle';
import { Table, Collapse } from 'reactstrap';
import { ItineraryActionsDropdown, PlaceActionsDropdown } from './actions.js';
import { latLngToText, placeToLatLng } from '../../../utils/transformers';
import AddPlace from './AddPlace';

export default function Itinerary(props) {
    function tripIsEmpty() {
        return !props.places || props.places.length === 0;
    }

    return (
        <Table responsive>
            <TripHeader placeActions={props.placeActions} disableRemoveAll={tripIsEmpty()} />
            <PlaceList places={props.places} placeActions={props.placeActions} selectedIndex={props.selectedIndex}/>
        </Table>
    );
}

function TripHeader(props) {
	const [showAddPlace, toggleAddPlace] = useToggle(false);
    return (
		<React.Fragment>
			<thead>
				<tr>
					<th className='trip-header-title'>My Trip</th>
					<th className='trip-header-actions'>
						<ItineraryActionsDropdown placeActions={props.placeActions} disableRemoveAll={props.disableRemoveAll} toggleAddPlace={toggleAddPlace}/>
					</th>
				</tr>
			</thead>
			<AddPlace isOpen={showAddPlace} toggleAddPlace={toggleAddPlace} append={props.placeActions.append}/>
		</React.Fragment>
    );
}

function PlaceList(props) {
	return (
		<tbody>
			{props.places.map((place, index) => (
				<PlaceRow
					key={`table-${JSON.stringify(place)}-${index}`}
					place={place}
					placeActions={props.placeActions}
                    selectedIndex={props.selectedIndex}
					index={index}
				/>
			))}
		</tbody>
	);
}

function PlaceRow(props) {
	const [showFullName, toggleShowFullName] = useToggle(false);
	const name = props.place.defaultDisplayName;
	const location = latLngToText(placeToLatLng(props.place));

	return (
		<tr className={props.selectedIndex === props.index ? 'selected-row' : ''}>

			<td
				data-testid={`place-row-${props.index}`}
				onClick={() => placeRowClicked(toggleShowFullName, props.placeActions.selectIndex,props.index)}
			>
				{!showFullName ? name : props.place.formatPlace()}
				<AdditionalPlaceInfo showFullName={showFullName} location={location} />
			</td>
			<td>
				<PlaceActionsDropdown
					placeActions={props.placeActions}
					index={props.index}
				/>
			</td>
		</tr>
	);
}

function AdditionalPlaceInfo(props){
	return(
		<Collapse isOpen={props.showFullName}>
			{props.location}
		</Collapse>
	);
}

function placeRowClicked(toggleShowFullName, selectIndex, placeIndex){
    toggleShowFullName();
    selectIndex(placeIndex);
}