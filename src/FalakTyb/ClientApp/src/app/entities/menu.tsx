import React from "react";
import { Translate } from "react-jhipster";

import MenuItem from "app/shared/layout/menus/menu-item";

const EntitiesMenu = () => {
  return (
    <>
      {/* prettier-ignore */}
      <MenuItem icon="asterisk" to="/providers">
        <Translate contentKey="global.menu.entities.providers" />
      </MenuItem>
      {/* <MenuItem icon="asterisk" to="/sub-providers">
        <Translate contentKey="global.menu.entities.subProviders" />
      </MenuItem> */}
      <MenuItem icon="asterisk" to="/providers-categories">
        <Translate contentKey="global.menu.entities.providersCategories" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/saved-providers">
        <Translate contentKey="global.menu.entities.savedProviders" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/offers">
        <Translate contentKey="global.menu.entities.offers" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/offers-categories">
        <Translate contentKey="global.menu.entities.offersCategories" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/contract">
        <Translate contentKey="global.menu.entities.contract" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/frequently-asked-questions">
        <Translate contentKey="global.menu.entities.frequentlyAskedQuestions" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/reviews-and-rating">
        <Translate contentKey="global.menu.entities.reviewsAndRating" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/notification">
        <Translate contentKey="global.menu.entities.notification" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/push-notifications">
        <Translate contentKey="global.menu.entities.pushNotifications" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/redeem">
        <Translate contentKey="global.menu.entities.redeem" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/complaint">
        <Translate contentKey="global.menu.entities.complaint" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/new-company">
        <Translate contentKey="global.menu.entities.newCompany" />
      </MenuItem>
      {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
    </>
  );
};

export default EntitiesMenu as React.ComponentType<any>;
