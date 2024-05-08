package edu.brown.cs.student.csvtests;

import static edu.brown.cs.student.main.csv.CsvSearch.*;
import static org.junit.jupiter.api.Assertions.*;

import edu.brown.cs.student.main.csv.*;
import edu.brown.cs.student.main.csv.creatorfromrow.*;
import java.io.*;
import java.util.List;
import org.junit.jupiter.api.*;

public class SearchTestHousing {

  private CreatorFromRow<List<String>> row;
  private ByteArrayOutputStream outputStream;
  String rootPath = System.getProperty("user.dir") + "/data/";

  @BeforeEach
  public void setUp() {
    row = new ParsedObject();
    outputStream = new ByteArrayOutputStream();
    System.setOut(new PrintStream(outputStream));
  }

  @AfterEach
  public void tearDown() {
    System.setOut(System.out);
  }

  /** Search checks the entire file if not given a column identifier */
  @Test
  public void testSearchAll() throws IOException, FactoryFailureException {
    CsvParser<List<String>> parser =
        new CsvParser<List<String>>(new StringReader("Billy, Bob, Joe, Had, A, Time"), row);
    CsvSearch searcher = new CsvSearch(parser, row);
    searcher.search(rootPath + "Sheet 2-Housing.csv", "DANOFF 511");
    System.setOut(System.out);
    String printedOutput = outputStream.toString();

    assertTrue(
        printedOutput.contains(
            "[DANOFF HALL, DANOFF FL 5, DANOFF 511, DANOFF 511 511A, DANOFF 511 511A-1, Single (Suite/Apartment), 4, CoEd, 24-25 Fall Senior Selection]"));
    assertTrue(
        printedOutput.contains(
            "[DANOFF HALL, DANOFF FL 5, DANOFF 511, DANOFF 511 511A, DANOFF 511 511A-1, Single (Suite/Apartment), 4, CoEd, 24-25 Fall Senior Selection]"));
  }

  /** Search can search by header. */
  @Test
  public void testSearchByHeader() throws IOException, FactoryFailureException {
    CsvParser<List<String>> parser =
        new CsvParser<>(new StringReader("Billy, Bob, Joe, Had, A, Time"), row);
    CsvSearch searcher = new CsvSearch(parser, row);
    searcher.search(rootPath + "Sheet 2-Housing.csv", "DANOFF HALL", "Building");
    System.setOut(System.out);
    String printedOutput = outputStream.toString();

    assertTrue(
        printedOutput.contains(
            "[DANOFF HALL, DANOFF FL 5, DANOFF 511, DANOFF 511 511A, DANOFF 511 511A-1, Single (Suite/Apartment), 4, CoEd, 24-25 Fall Senior Selection]"));
    assertTrue(
        printedOutput.contains(
            "[DANOFF HALL, DANOFF FL 5, DANOFF 511, DANOFF 511 511A, DANOFF 511 511A-1, Single (Suite/Apartment), 4, CoEd, 24-25 Fall Senior Selection]"));
    assertFalse(
        printedOutput.contains(
            "[BARBOUR HALL, BARBOUR FL 0 APT, BARBOUR 080, BARBOUR 080 084, BARBOUR 080 084-2, Double (Suite/Apartment), 4, CoEd, 24-25 Fall Senior Selection]"));
  }

  /** Search does not output a matching row if the header does not match. */
  @Test
  public void restrictByHeader() throws IOException, FactoryFailureException {
    CsvParser<List<String>> parser =
        new CsvParser<>(new StringReader("Billy, Bob, Joe, Had, A, Time"), row);
    CsvSearch searcher = new CsvSearch(parser, row);
    searcher.search(rootPath + "Sheet 2-Housing.csv", "DANOFF HALL", "Suite");
    System.setOut(System.out);
    String printedOutput = outputStream.toString();

    assertFalse(
        printedOutput.contains(
            "[DANOFF HALL, DANOFF FL 5, DANOFF 511, DANOFF 511 511A, DANOFF 511 511A-1, Single (Suite/Apartment), 4, CoEd, 24-25 Fall Senior Selection]"));
    assertEquals(printedOutput, "");
  }

  /** Search searches by substrings, not just exact value. */
  @Test
  public void testSearchBySubstrings() throws IOException, FactoryFailureException {
    CsvParser<List<String>> parser =
        new CsvParser<>(new StringReader("Billy, Bob, Joe, Had, A, Time"), row);
    CsvSearch searcher = new CsvSearch(parser, row);
    searcher.search(rootPath + "Sheet 2-Housing.csv", "DANOFF", "Building");
    System.setOut(System.out);
    String printedOutput = outputStream.toString();

    assertTrue(
        printedOutput.contains(
            "[DANOFF HALL, DANOFF FL 5, DANOFF 511, DANOFF 511 511A, DANOFF 511 511A-1, Single (Suite/Apartment), 4, CoEd, 24-25 Fall Senior Selection]"));
  }

  /** Search is case-insensitive. */
  @Test
  public void testSearchCaseInsensitive() throws IOException, FactoryFailureException {
    CsvParser<List<String>> parser =
        new CsvParser<>(new StringReader("Billy, Bob, Joe, Had, A, Time"), row);
    CsvSearch searcher = new CsvSearch(parser, row);
    searcher.search(rootPath + "Sheet 2-Housing.csv", "danoff hall", "Building");
    System.setOut(System.out);
    String printedOutput = outputStream.toString();

    assertTrue(
        printedOutput.contains(
            "[DANOFF HALL, DANOFF FL 5, DANOFF 511, DANOFF 511 511A, DANOFF 511 511A-1, Single (Suite/Apartment), 4, CoEd, 24-25 Fall Senior Selection]"));
  }

  /** Search can match rows given a column index */
  @Test
  public void testSearchByColumnNum() throws IOException, FactoryFailureException {
    CsvParser<List<String>> parser =
        new CsvParser<List<String>>(new StringReader("Billy, Bob, Joe, Had, A, Time"), row);
    CsvSearch searcher = new CsvSearch(parser, row);
    searcher.search(rootPath + "Sheet 2-Housing.csv", "DANOFF HALL", 0);
    System.setOut(System.out);
    String printedOutput = outputStream.toString();

    assertTrue(
        printedOutput.contains(
            "[DANOFF HALL, DANOFF FL 5, DANOFF 511, DANOFF 511 511A, DANOFF 511 511A-1, Single (Suite/Apartment), 4, CoEd, 24-25 Fall Senior Selection]"));
    assertTrue(
        printedOutput.contains(
            "[DANOFF HALL, DANOFF FL 5, DANOFF 511, DANOFF 511 511A, DANOFF 511 511A-1, Single (Suite/Apartment), 4, CoEd, 24-25 Fall Senior Selection]"));
  }

  /** Search can match rows given a column index, case insensitive */
  @Test
  public void testSearchByColumnCaseInsensitive() throws IOException, FactoryFailureException {
    CsvParser<List<String>> parser =
        new CsvParser<List<String>>(new StringReader("Billy, Bob, Joe, Had, A, Time"), row);
    CsvSearch searcher = new CsvSearch(parser, row);
    searcher.search(rootPath + "Sheet 2-Housing.csv", "danoff hall", 0);
    System.setOut(System.out);
    String printedOutput = outputStream.toString();

    assertTrue(
        printedOutput.contains(
            "[DANOFF HALL, DANOFF FL 5, DANOFF 511, DANOFF 511 511A, DANOFF 511 511A-1, Single (Suite/Apartment), 4, CoEd, 24-25 Fall Senior Selection]"));
    assertTrue(
        printedOutput.contains(
            "[DANOFF HALL, DANOFF FL 5, DANOFF 511, DANOFF 511 511A, DANOFF 511 511A-1, Single (Suite/Apartment), 4, CoEd, 24-25 Fall Senior Selection]"));
  }

  /** Search can match rows given a column index by a substring */
  @Test
  public void testSearchByColumnSubstring() throws IOException, FactoryFailureException {
    CsvParser<List<String>> parser =
        new CsvParser<List<String>>(new StringReader("Billy, Bob, Joe, Had, A, Time"), row);
    CsvSearch searcher = new CsvSearch(parser, row);
    searcher.search(rootPath + "Sheet 2-Housing.csv", "DANOFF", 0);
    System.setOut(System.out);
    String printedOutput = outputStream.toString();

    assertTrue(
        printedOutput.contains(
            "[DANOFF HALL, DANOFF FL 5, DANOFF 511, DANOFF 511 511A, DANOFF 511 511A-1, Single (Suite/Apartment), 4, CoEd, 24-25 Fall Senior Selection]"));
    assertTrue(
        printedOutput.contains(
            "[DANOFF HALL, DANOFF FL 5, DANOFF 511, DANOFF 511 511A, DANOFF 511 511A-1, Single (Suite/Apartment), 4, CoEd, 24-25 Fall Senior Selection]"));
  }
}
