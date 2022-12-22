import React from 'react';
import { ButtonGroup, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { FaHome, FaPlus, FaTrash, FaTrashAlt } from 'react-icons/fa';
import { DEFAULT_STARTING_POSITION } from '../../../utils/constants';

export function ItineraryActionsDropdown(props) {
    return (
        <ActionsDropdown {...props}>
            <DropdownItem onClick={() => props.placeActions.append(DEFAULT_STARTING_POSITION)} data-testid='home-button'>
                <FaHome />
            </DropdownItem>
            <DropdownItem disabled={props.disableRemoveAll} onClick={() => props.placeActions.removeAll()} data-testid='delete-all-button'>
                <FaTrashAlt />
            </DropdownItem>
            <DropdownItem onClick={() => props.toggleAddPlace()} data-testid='add-place-button'>
                <FaPlus />
            </DropdownItem>
        </ActionsDropdown>
    );
}

export function PlaceActionsDropdown(props) {
    return (
        <ActionsDropdown {...props}>
            <DropdownItem onClick={() => props.placeActions.removeAtIndex(props.index)} data-testid={`delete-button-${props.index}`}>
                <FaTrash />
            </DropdownItem>
        </ActionsDropdown>
    );
}

function ActionsDropdown(props) {
    return (
        <UncontrolledDropdown direction="left">
            <DropdownToggle tag="div" data-testid={`row-toggle-${props.index}`}>
                <BiDotsVerticalRounded size="1.5em" />
            </DropdownToggle>
            <DropdownMenu>
                <ButtonGroup>
                    {props.children}
                </ButtonGroup>
            </DropdownMenu>
        </UncontrolledDropdown>
    );
}