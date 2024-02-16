import type { Schema, Attribute } from '@strapi/strapi';

export interface BlocksBanner extends Schema.Component {
  collectionName: 'components_blocks_banners';
  info: {
    displayName: 'Banner';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    text: Attribute.String;
    form: Attribute.Boolean & Attribute.Required & Attribute.DefaultTo<false>;
    button: Attribute.Component<'ui.button'>;
    img: Attribute.Component<'ui.img', true>;
    fon: Attribute.Media;
  };
}

export interface CardsCard extends Schema.Component {
  collectionName: 'components_article_cards';
  info: {
    displayName: 'article';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    date: Attribute.Date;
    img: Attribute.Media;
    category: Attribute.Relation<
      'cards.card',
      'oneToOne',
      'api::article-category.article-category'
    >;
  };
}

export interface UiButton extends Schema.Component {
  collectionName: 'components_ui_buttons';
  info: {
    displayName: 'Button';
  };
  attributes: {
    text: Attribute.String;
    link: Attribute.String;
  };
}

export interface UiImg extends Schema.Component {
  collectionName: 'components_ui_imgs';
  info: {
    displayName: 'img';
  };
  attributes: {
    size: Attribute.BigInteger;
    img: Attribute.Media;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'blocks.banner': BlocksBanner;
      'cards.card': CardsCard;
      'ui.button': UiButton;
      'ui.img': UiImg;
    }
  }
}
