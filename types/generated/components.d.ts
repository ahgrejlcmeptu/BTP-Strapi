import type { Schema, Attribute } from '@strapi/strapi';

export interface ArticlesShapka extends Schema.Component {
  collectionName: 'components_articles_shapka';
  info: {
    displayName: '\u0428\u0430\u043F\u043A\u0430';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    img: Attribute.Media;
    description: Attribute.Blocks;
    textWidth: Attribute.Blocks;
    textColumn: Attribute.Blocks;
  };
}

export interface ArticlesSlajder extends Schema.Component {
  collectionName: 'components_articles_slajder';
  info: {
    displayName: '\u0421\u043B\u0430\u0439\u0434\u0435\u0440';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    subtitle: Attribute.String;
    img: Attribute.Media;
  };
}

export interface ArticlesTablicza extends Schema.Component {
  collectionName: 'components_articles_tablicza';
  info: {
    displayName: '\u0422\u0430\u0431\u043B\u0438\u0446\u0430';
    description: '';
  };
  attributes: {
    h4: Attribute.String;
  };
}

export interface CardsNovosti extends Schema.Component {
  collectionName: 'components_cards_novosti';
  info: {
    displayName: '\u041D\u043E\u0432\u043E\u0441\u0442\u0438';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    date: Attribute.Date;
    img: Attribute.Media & Attribute.Required;
    category: Attribute.Enumeration<
      [
        '\u043D\u0430\u0448\u0438 \u043D\u043E\u0432\u043E\u0441\u0442\u0438',
        '\u0442\u0435\u0445. \u0440\u0430\u0431\u043E\u0442\u044B',
        '\u0430\u043A\u0446\u0438\u0438',
        '\u0430\u0431\u043E\u043D\u0435\u043D\u0442\u0430\u043C'
      ]
    > &
      Attribute.DefaultTo<'\u043D\u0430\u0448\u0438 \u043D\u043E\u0432\u043E\u0441\u0442\u0438'>;
  };
}

export interface TableShapka extends Schema.Component {
  collectionName: 'components_table_shapka';
  info: {
    displayName: '\u0428\u0430\u043F\u043A\u0430';
  };
  attributes: {};
}

export interface TableStroka extends Schema.Component {
  collectionName: 'components_table_stroka';
  info: {
    displayName: '\u0421\u0442\u0440\u043E\u043A\u0430';
  };
  attributes: {};
}

export interface TableTablicza extends Schema.Component {
  collectionName: 'components_table_tablicza';
  info: {
    displayName: '\u0422\u0430\u0431\u043B\u0438\u0446\u0430';
  };
  attributes: {
    head: Attribute.Component<'table.shapka', true>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'articles.shapka': ArticlesShapka;
      'articles.slajder': ArticlesSlajder;
      'articles.tablicza': ArticlesTablicza;
      'cards.novosti': CardsNovosti;
      'table.shapka': TableShapka;
      'table.stroka': TableStroka;
      'table.tablicza': TableTablicza;
    }
  }
}
