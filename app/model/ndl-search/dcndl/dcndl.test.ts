import { expect, test, describe } from 'vitest';
import { DcNdlParser } from './index';
import myFathersDragon from './test-fixtures/my-fathers-dragon.rdf?raw';
import programmingTypescript from './test-fixtures/programming-typescript.rdf?raw';
import zeikinDeKattaHon from './test-fixtures/zeikin-de-katta-hon.rdf?raw';
import computerOrganizationAndDesign from './test-fixtures/computer-organization-and-design.rdf?raw';

describe("エルマーのぼうけん(test-fixtures/my-fathers-dragon.rdf)", async () => {
  const parser = new DcNdlParser();
  await parser.parseXml(myFathersDragon);

  test("dcndl:catalogingStatus", () => {
    expect(parser.catalogingStatus).toBe("C7");
  })

  test("dcndl:catalogingRule", () => {
    expect(parser.catalogingRule).toBe("ncr");
  })

  test("dcterms:description", () => {
    expect(parser.dctermsDescription).toMatchObject(["type : book"]);
  })

  test("dcterms:identifier", () => {
    const expected = [
      { datatype: "http://ndl.go.jp/dcndl/terms/JPNO", value: "45022603" },
      { datatype: "http://ndl.go.jp/dcndl/terms/NDLBibID", value: "000000814611" }]
    expect(parser.dctermsIdentifier).toMatchObject(expected);
  });

  test("dcndl:sourceIdentifier", () => {
    expect(parser.sourceIdentifier).toMatchObject([]);
  });

  test("dcterms:title", () => {
    expect(parser.dctermsTitle).toBe("エルマーのぼうけん");
  });

  test("dc:title", () => {
    expect(parser.dcTitle).toMatchObject([{
      value: "エルマーのぼうけん",
      transcription: "エルマー ノ ボウケン"
    }]);
  })

  test("dcndl:volume", () => {
    expect(parser.volume).toMatchObject([]);
  })

  test("dcndl:volumeTitle", () => {
    expect(parser.volumeTitle).toMatchObject([]);
  })

  test("dcndl:alternative", () => {
    expect(parser.alternative).toMatchObject([]);
  })

  test("dcndl:alternativeVolume", () => {
    expect(parser.alternativeVolume).toMatchObject([]);
  })

  test("dcndl:alternativeVolumeTitle", () => {
    expect(parser.alternativeVolumeTitle).toMatchObject([]);
  })

  test("dcndl:seriesTitle", () => {
    expect(parser.seriesTitle).toMatchObject([]);
  })

  test("dcndl:edition", () => {
    expect(parser.edition).toMatchObject([]);
  });

  test("dcterms:creator", () => {
    const expected = [
      { about: "http://id.ndl.go.jp/auth/entity/00440494", name: "Gannett, Ruth Stiles, 1923-" },
      { about: "http://id.ndl.go.jp/auth/entity/00618242", name: "Gannett, Ruth Chrisman, 1896-1979" },
      { about: "http://id.ndl.go.jp/auth/entity/00091023", name: "渡辺, 茂男, 1928-2006", transcription: "ワタナベ, シゲオ, 1928-2006" }]

    expect(parser.dctermsCreator).toMatchObject(expected);
  });

  test("dc:creator", () => {
    const expected = [
      "ルース・スタイルス・ガネット さく",
      "わたなべしげお やく",
      "ルース・クリスマン・ガネット 絵"]

    expect(parser.dcCreator).toMatchObject(expected);
  });

  test("dcndl:creatorAlternative", () => {
    expect(parser.creatorAlternative).toMatchObject([]);
  })

  test("dcndl:seriesCreator", () => {
    expect(parser.seriesCreator).toMatchObject([]);
  })

  test("dcndl:editionCreator", () => {
    expect(parser.editionCreator).toMatchObject([]);
  })

  test("dcndl:contributor", () => {
    expect(parser.contributor).toMatchObject([]);
  })

  test("dcterms:publisher", () => {
    expect(parser.dctermsPublisher).toMatchObject([{ name: "福音館書店", location: "東京" }]);
  });

  test("dcndl:publicationPlace", () => {
    expect(parser.publicationPlace).toMatchObject([{
      datatype: "http://purl.org/dc/terms/ISO3166", value: "JP"
    }]);
  });

  test("dcterms:date", () => {
    expect(parser.dctermsDate).toMatchObject(["昭和38"]);
  })

  test("dcterms:issued", () => {
    expect(parser.dctermsIssued).toMatchObject([{ datatype: "http://purl.org/dc/terms/W3CDTF", value: "1963" }])
  })

  test("dcndl:partInformation", () => {
    expect(parser.dcndlPartInformation).toMatchObject([]);
  });

  test("dcterms:subject", () => {
    expect(parser.dctermsSubject).toMatchObject([]);
  });

  test("dc:subject", () => {
    expect(parser.dcSubject).toMatchObject([]);
  });


  test("dcterms:language", () => {
    expect(parser.dctermsLanguage).toMatchObject([{
      datatype: "http://purl.org/dc/terms/ISO639-2", value: "jpn"
    }]);
  });

  test("dcndl:originalLanguage", () => {
    expect(parser.originalLanguage).toMatchObject([]);
  });


  test("dcndl:price", () => {
    expect(parser.price).toMatchObject([]);
  });

  test("dcterms:extent", () => {
    expect(parser.dctermsExtent).toMatchObject(["116p ; 22cm"]);
  });

  test("dcterms:format", () => {
    expect(parser.dctermsFormat).toMatchObject([]);
  })

})


describe("プログラミングTypeScript (test-fixtures/programming-typescript.rdf)", async () => {

  const parser = new DcNdlParser();
  await parser.parseXml(programmingTypescript);

  test("dcndl:catalogingStatus", () => {
    expect(parser.catalogingStatus).toBe("C7");
  })

  test("dcndl:catalogingRule", () => {
    expect(parser.catalogingRule).toBe("ncr/1987");
  })

  test("dcterms:description", () => {
    expect(parser.dctermsDescription).toMatchObject(["type : book"]);
  })

  test("dcterms:identifier", () => {
    const expected = [
      { datatype: "http://ndl.go.jp/dcndl/terms/JPNO", value: "23357099" },
      { datatype: "http://ndl.go.jp/dcndl/terms/NDLBibID", value: "030292376" },
      { datatype: "http://ndl.go.jp/dcndl/terms/TOHANMARCNO", value: "34046612" },
      { datatype: "http://ndl.go.jp/dcndl/terms/ISBN", value: "978-4-87311-904-5" },
    ]
    expect(parser.dctermsIdentifier).toMatchObject(expected);
  });

  test("dcterms:title", () => {
    expect(parser.dctermsTitle).toBe("プログラミングTypeScript : スケールするJavaScriptアプリケーション開発");
  });

  test("dc:title", () => {
    expect(parser.dcTitle).toMatchObject([{
      value: "プログラミングTypeScript : スケールするJavaScriptアプリケーション開発",
      transcription: "プログラミング タイプ スクリプト : スケール スル ジャヴァ スクリプト アプリケーション カイハツ"
    }]);
  })

  test("dcndl:alternative", () => {
    expect(parser.alternative).toMatchObject([{
      value: "Programming TypeScript"
    }]);
  })

  test("dcterms:creator", () => {
    const expected = [
      { about: "http://id.ndl.go.jp/auth/entity/001344802", name: "Cherny, Boris" },
      { about: "http://id.ndl.go.jp/auth/entity/001344803", name: "今村, 謙士" },
      { about: "http://id.ndl.go.jp/auth/entity/00552631", name: "原, 隆文, 1965-", transcription: "ハラ, タカフミ, 1965-" }]

    expect(parser.dctermsCreator).toMatchObject(expected);
  });

  test("dc:creator", () => {
    const expected = ["Boris Cherny 著", "今村謙士 監訳", "原隆文 訳"]

    expect(parser.dcCreator).toMatchObject(expected);
  });

  test("dcterms:publisher", () => {
    expect(parser.dctermsPublisher).toMatchObject([
      { name: "オライリー・ジャパン", transcription: "オライリージャパン" },
      { name: "オーム社", transcription: "オームシャ", location: "東京" }
    ]);
  });

  test("dcndl:publicationPlace", () => {
    expect(parser.publicationPlace).toMatchObject([{
      datatype: "http://purl.org/dc/terms/ISO3166", value: "JP"
    }]);
  });

  test("dcterms:date", () => {
    expect(parser.dctermsDate).toMatchObject(["2020.3"]);
  })

  test("dcterms:issued", () => {
    expect(parser.dctermsIssued).toMatchObject([{ datatype: "http://purl.org/dc/terms/W3CDTF", value: "2020" }])
  })

  test("dcterms:subject", () => {
    expect(parser.dctermsSubject).toMatchObject([
      { transcription: "プログラミング (コンピュータ)", value: "プログラミング (コンピュータ)", },
      { resource: "http://id.ndl.go.jp/class/ndlc/M159" },
      { resource: "http://id.ndl.go.jp/class/ndc10/007.64" }]);
  });

  test("dcterms:language", () => {
    expect(parser.dctermsLanguage).toMatchObject([{
      datatype: "http://purl.org/dc/terms/ISO639-2", value: "jpn"
    }]);
  });

  test("dcndl:originalLanguage", () => {
    expect(parser.originalLanguage).toMatchObject([{
      datatype: "http://purl.org/dc/terms/ISO639-2", value: "eng"
    }]);
  });


  test("dcndl:price", () => {
    expect(parser.price).toMatchObject(["3400円"]);
  });

  test("dcterms:extent", () => {
    expect(parser.dctermsExtent).toMatchObject(["349p ; 24cm"]);
  });
})


describe("税金で買った本.1 (test-fixtures/zeikin-de-katta-hon.rdf)", async () => {

  const parser = new DcNdlParser();
  await parser.parseXml(zeikinDeKattaHon);

  test("dcndl:volume", () => {
    expect(parser.volume).toMatchObject([{
      value: "1",
      transcription: "1"
    }]);
  })

  test("dcndl:seriesTitle", () => {
    expect(parser.seriesTitle).toMatchObject([{
      value: "ヤンマガKC",
      transcription: "ヤンマガ ケーシー"
    }])
  })
})


describe("コンピュータの構成と設計（下） (test-fixtures/computer-organization-and-design.rdf)", async () => {

  const parser = new DcNdlParser();
  await parser.parseXml(computerOrganizationAndDesign);

  test("dcndl:volume", () => {
    expect(parser.volume).toMatchObject([{
      value: "下",
      transcription: "2"
    }]);
  })

  test("dcndl:alternative", ()=>{
    expect(parser.alternative).toMatchObject([{
      value: "COMPUTER ORGANIZATION AND DESIGN"
    }])
  })

  test("dcndl:edition", () => {
    expect(parser.edition).toMatchObject(['第5版']);
  });

})

/*  TODO: More tests needed!
 *  We need to test under the condition the fllowing properties are present:
 *  - dcndl:sourceIdentifier
 *  - dcndl:volumeTitle
 *  - dcndl:alternativeVolume
 *  - dcndl:alternativeVolumeTitle
 *  - dcndl:creatorAlternative
 *  - dcndl:seriesCreator
 *  - dcndl:editionCreator
 *  - dcndl:contributor
 *  - dcndl:partInformation
 *  - dc:subject
 *  - dcterms:format
 */
