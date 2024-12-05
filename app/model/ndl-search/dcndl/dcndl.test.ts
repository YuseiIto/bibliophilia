import { expect, test, describe } from 'vitest';
import { DcNdlParser } from './index';
import myFathersDragon from './test-fixtures/my-fathers-dragon.rdf?raw';


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
    expect(parser.sourceIdentifier).toMatchObject([]); // TODO: ここがemptyでないテストも必要
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
    expect(parser.volume).toMatchObject([]); // TODO: ここがemptyでないテストも必要
  })

  test("dcndl:volumeTitle", () => {
    expect(parser.volumeTitle).toMatchObject([]); // TODO: ここがemptyでないテストも必要
  })

  test("dcndl:alternative", () => {
    expect(parser.alternative).toMatchObject([]); // TODO: ここがemptyでないテストも必要
  })

  test("dcndl:alternativeVolume", () => {
    expect(parser.alternativeVolume).toMatchObject([]); // TODO: ここがemptyでないテストも必要
  })

  test("dcndl:alternativeVolumeTitle", () => {
    expect(parser.alternativeVolumeTitle).toMatchObject([]) // TODO: ここがemptyでないテストも必要
  })

  test("dcndl:seriesTitle", () => {
    expect(parser.seriesTitle).toMatchObject([]) // TODO: ここがemptyでないテストも必要
  })

  test("dcndl:edition", () => {
    expect(parser.edition).toMatchObject([]); // TODO: ここがemptyでないテストも必要
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
    expect(parser.creatorAlternative).toMatchObject([]); // TODO: ここがemptyでないテストも必要
  })

  test("dcndl:seriesCreator", () => {
    expect(parser.seriesCreator).toMatchObject([]); // TODO: ここがemptyでないテストも必要
  })

  test("dcndl:editionCreator", () => {
    expect(parser.editionCreator).toMatchObject([]); // TODO: ここがemptyでないテストも必要
  })

  test("dcndl:contributor", () => {
    expect(parser.contributor).toMatchObject([]); // TODO: ここがemptyでないテストも必要
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
    expect(parser.dcndlPartInformation).toMatchObject([]); // TODO: ここがemptyでないテストも必要
  });

  test("dcterms:subject", () => {
    expect(parser.dctermsSubject).toMatchObject([]); // TODO: ここがemptyでないテストも必要
  });

  test("dc:subject", () => {
    expect(parser.dcSubject).toMatchObject([]); // TODO: ここがemptyでないテストも必要
  });


  test("dcterms:language", () => {
    expect(parser.dctermsLanguage).toMatchObject([{
      datatype: "http://purl.org/dc/terms/ISO639-2", value: "jpn"
    }]);
  });

  test("dcndl:originalLanguage", () => {
    expect(parser.originalLanguage).toMatchObject([]); // TODO: ここがemptyでないテストも必要
  });


  test("dcndl:price", () => {
    expect(parser.price).toMatchObject([]); // TODO: ここがemptyでないテストも必要
  });
  
  test("dcterms:extent", () => {
    expect(parser.dctermsExtent).toMatchObject(["116p ; 22cm"]);
  });

  test("dcterms:format", () =>{
    expect(parser.dctermsFormat).toMatchObject([]); // TODO: ここがemptyでないテストも必要
  })

  test("foaf:thumbnail", () =>{
    expect(parser.foafThumbnail).toMatchObject([]); // TODO: ここがemptyでないテストも必要
  })



})
