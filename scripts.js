'use strict';

const STORE = {

  items: [
    {name: 'apples', checked: false, foundWhenSearched: false},
    {name: 'oranges', checked: false, foundWhenSearched: false},
    {name: 'milk', checked: true, foundWhenSearched: false},
    {name: 'bread', checked: false, foundWhenSearched: false}
  ],

  displayUnchecked: false,
  searchedItem: '',
  displayMatch: false,
};

function generateItemElement(item, itemIndex, template) {
  return `
    <li class="js-item-index-element" data-item-index="${itemIndex}" \
    ${STORE.displayUnchecked && item.checked ? 'hidden' : ''}\
    ${STORE.displayMatch && !item.foundWhenSearched ? 'hidden' : ''}>
      <span class="shopping-item js-shopping-item ${item.checked ? 'shopping-item__checked' : ''}">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;
}

function generateShoppingItemsString(shoppingList) {
  console.log('Generating shopping list element');

  const items = shoppingList.map((item, index) => generateItemElement(item, index));
  
  return items.join('');
}


function renderShoppingList() {
  // render the shopping list in the DOM
  console.log('`renderShoppingList` ran');
  const shoppingListItemsString = generateShoppingItemsString(STORE.items);

  // insert that HTML into the DOM
  $('.js-shopping-list').html(shoppingListItemsString);
}


function addItemToShoppingList(itemName) {
  console.log(`Adding "${itemName}" to shopping list`);
  STORE.items.push({name: itemName, checked: false, foundWhenSearched:false});
}

function handleNewItemSubmit() {
  $('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    console.log('`handleNewItemSubmit` ran');
    const newItemName = $('.js-shopping-list-entry').val();
    $('.js-shopping-list-entry').val('');
    addItemToShoppingList(newItemName);
    renderShoppingList();
  });
}

function toggleCheckedForListItem(itemIndex) {
  console.log('Toggling checked property for item at index ' + itemIndex);
  STORE.items[itemIndex].checked = !STORE.items[itemIndex].checked;
}


function getItemIndexFromElement(item) {
  const itemIndexString = $(item)
    .closest('.js-item-index-element')
    .attr('data-item-index');
  return parseInt(itemIndexString, 10);
}

function handleItemCheckClicked() {
  $('.js-shopping-list').on('click', '.js-item-toggle', event => {
    console.log('`handleItemCheckClicked` ran');
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    toggleCheckedForListItem(itemIndex);
    renderShoppingList();
  });
}


function handleDeleteItemClicked() {
  // this function will be responsible for when users want to delete a shopping list
  // item
  $('.js-shopping-list').on('click', '.shopping-item-delete', event => {
    console.log('`handleDeleteItemClicked` ran');
    //  we need this to tell us where we're clicking delete
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    deleteItem(itemIndex);
    renderShoppingList();
  });
}

function deleteItem (itemIndex){
  STORE.items.splice(itemIndex, 1);
}

function handleShowUncheckedOnly(){
  $('#filterChecked').submit(function(event){
    event.preventDefault();
    changeSTOREDisplayUnchecked();
    renderShoppingList();
  });
}
  
function changeSTOREDisplayUnchecked() {
  STORE.displayUnchecked = !STORE.displayUnchecked;
}

function handleSearchInputClick(){
  $('#js-search-bar').submit(function(event) {
    event.preventDefault();
    console.log('you selected me right');
    STORE.searchedItem = $('.js-search-entry').val();
    console.log(STORE.searchedItem);
    runASearch();
  });
}
function runASearch(){
  for(const prop in STORE.items){
    if(STORE.items[prop].name === STORE.searchedItem){
      STORE.items[prop].foundWhenSearched = true;
    }
  }
  STORE.displayMatch = true;
  renderShoppingList();
}

function resetFound() {
  for(const prop in STORE.items){
    STORE.items[prop].foundWhenSearched = false;
  }
  STORE.displayMatch = false;
  renderShoppingList();
}

function handleShowList(){
  $('#resetDisplay').submit(function(event) {
    event.preventDefault();
    console.log('you are targeting what you think you are');
    resetFound();
  });
}

    
// console.log(STORE.items[prop].name);
    



// then we need to filter the displayed items, or STORE to only show those items that match whats captured from the submit input


  
//   console.log(STORE.uncheckedOnly);






// function showOnlyUnchecked



// this function will be our callback when the page loads. it's responsible for
// initially rendering the shopping list, and activating our individual functions
// that handle new item submission and user clicks on the "check" and "delete" buttons
// for individual shopping list items.
function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  handleShowUncheckedOnly();
  handleSearchInputClick();
  handleShowList();
}

// when the page loads, call `handleShoppingList`
$(handleShoppingList);