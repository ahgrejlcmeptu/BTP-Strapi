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

export interface HelpCard extends Schema.Component {
  collectionName: 'components_help_cards';
  info: {
    displayName: 'card';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Blocks;
  };
}

export interface HelpOne extends Schema.Component {
  collectionName: 'components_help_ones';
  info: {
    displayName: 'one';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Blocks;
  };
}

export interface HelpPlateColumn extends Schema.Component {
  collectionName: 'components_help_plate_columns';
  info: {
    displayName: 'plateColumn';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Blocks;
  };
}

export interface HelpPlate extends Schema.Component {
  collectionName: 'components_help_plates';
  info: {
    displayName: 'plate';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Blocks;
  };
}

export interface HelpSlide extends Schema.Component {
  collectionName: 'components_help_slides';
  info: {
    displayName: 'slide';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Blocks;
    slide: Attribute.Component<'ui.slide', true>;
  };
}

export interface HelpTwo extends Schema.Component {
  collectionName: 'components_help_twos';
  info: {
    displayName: 'two';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Blocks;
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

export interface UiColumn extends Schema.Component {
  collectionName: 'components_ui_columns';
  info: {
    displayName: 'table';
    description: '';
  };
  attributes: {
    th: Attribute.String;
    tr: Attribute.Component<'ui.tr', true>;
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

export interface UiReviews extends Schema.Component {
  collectionName: 'components_ui_reviews';
  info: {
    displayName: 'reviews';
  };
  attributes: {
    like: Attribute.BigInteger;
    dislike: Attribute.BigInteger;
  };
}

export interface UiSlide extends Schema.Component {
  collectionName: 'components_ui_slides';
  info: {
    displayName: 'slide';
  };
  attributes: {
    img: Attribute.Media;
    poster: Attribute.Media;
    video: Attribute.Media;
    youtube: Attribute.String;
  };
}

export interface UiTr extends Schema.Component {
  collectionName: 'components_ui_trs';
  info: {
    displayName: 'tr';
  };
  attributes: {
    td: Attribute.Blocks;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'blocks.banner': BlocksBanner;
      'cards.card': CardsCard;
      'help.card': HelpCard;
      'help.one': HelpOne;
      'help.plate-column': HelpPlateColumn;
      'help.plate': HelpPlate;
      'help.slide': HelpSlide;
      'help.two': HelpTwo;
      'ui.button': UiButton;
      'ui.column': UiColumn;
      'ui.img': UiImg;
      'ui.reviews': UiReviews;
      'ui.slide': UiSlide;
      'ui.tr': UiTr;
    }
  }
}
