import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import {
  FaPlay,
  FaHandsHelping,
} from "../middlewares/icons";
import Header from "../components/Header";

const Home = () => {
  const [fix, setFix] = useState(false);

  function fixedOnscroll() {
    if (window.scrollY >= 600) {
      setFix(true);
    } else {
      setFix(false);
    }
  }
  window.addEventListener("scroll", fixedOnscroll);
  return (
    <React.Fragment>
      <Helmet>
        <title>Home - Vatel Smart Contract.</title>
        <meta
          name="description"
          content="Étudier avec le contenu éducatif de qualité basé sur le programme d'étude national relatif à chaque niveau."
        />
        <meta
          name="keywords"
          content="École, School, Masomo, Étudier, Éducation"
        />
      </Helmet>
      <div className="home">
        <div className="header">
          <Header fix={fix}/>
          <div className={fix ? "banner fixed" : "banner"}>
            <div className="left">
              <h2 className="title t-1">
                Vatel Digital Contract and Electronic Signatures Platform,{" "}
                <br />
                Data System Protection!
              </h2>
              <p className="title t-2">
                Solution for ensuring security and visibility for all parties
                engaging in a binding agreement...
              </p>
              <div className="buttons">
                <Link to="/register" className="btn-join link">
                  Get started
                </Link>
                <button className="button btn-demo">
                  <span className="icon">
                    <FaPlay />
                  </span>
                  See how it works ?
                </button>
              </div>
            </div>
            <div className="right">
              <img src={process.env.PUBLIC_URL + "/blockch.png"} />
            </div>
          </div>
        </div>
        <div className="section-one">
          <div className="container">
            <h2 className="t-1">Platform benefits </h2>
            <p>
              This Vatel platform can be used to verify the identity,
              qualifications, credentials, and experiences of potential
              candidates during the selection process and offers various
              benefits to Human Resources, such as :
            </p>
            <div className="items-container">
              <div className="item">
                <span className="icon"><FaHandsHelping/></span>
                <span className="t-1">Control of employee work history</span>
              </div>
              <div className="item">
                <span className="icon"><FaHandsHelping/></span>
                <span className="t-1">Security and access to data</span>
              </div>
              <div className="item">
                <span className="icon"><FaHandsHelping/></span>
                <span className="t-1">Compliance and regulations</span>
              </div>
              <div className="item">
                <span className="icon"><FaHandsHelping/></span>
                <span className="t-1">Payments and benefits</span>
              </div>
              <div className="item">
                <span className="icon"><FaHandsHelping/></span>
                <span className="t-1">Performance monitoring</span>
              </div>
              <div className="item">
                <span className="icon"><FaHandsHelping/></span>
                <span className="t-1">Training and updating</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer">
          <div className="container">
            <span>All rights reserved Vatel &copy; 2023 - Smart Contract Platform.</span>
          </div>
        </div>

        {/* <div>
          <table class="table responsive-table" id="drugs-table">
            <thead class="thead-dark">
              <tr>
                <th class="name-head">
                  <a
                    class="sort-link"
                    href="/drugs?approved=1&amp;c=name&amp;d=down&amp;page=1"
                    rel="nofollow"
                  >
                    Name
                  </a>
                  <span class="glyphicon glyphicon-circle-arrow-up"> </span>
                </th>
                <th class="weight-head">
                  <a
                    class="sort-link"
                    href="/drugs?approved=1&amp;c=weight&amp;d=down&amp;page=1"
                    rel="nofollow"
                  >
                    Weight
                  </a>
                </th>
                <th class="structure-head">Structure</th>
                <th class="description-head">Description</th>
                <th class="categories-head">Categories</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="name-value text-sm-center drug-name">
                  <strong>
                    <a href="/drugs/DB11331">
                      1-Palmitoyl-2-oleoyl-sn-glycero-3-(phospho-rac-(1-glycerol))
                    </a>
                  </strong>
                </td>
                <td class="weight-value">
                  749.02
                  <br />
                  <br /> C<sub>40</sub>H<sub>77</sub>O<sub>10</sub>P
                </td>
                <td class="structure-value">
                  <a
                    class="moldbi-vector-thumbnail"
                    href="/structures/DB11331/image.svg"
                  >
                    <img src="/structures/DB11331/thumb.svg" />
                  </a>
                </td>
                <td class="description-value">
                  A synthetic lung surfactant used to treat infant respiratory
                  distress syndrome.
                </td>
                <td class="categories-value">
                  <span class="not-available">Not Available</span>
                </td>
              </tr>
              <tr>
                <td class="name-value text-sm-center drug-name">
                  <strong>
                    <a href="/drugs/DB12537">1,2-Benzodiazepine</a>
                  </strong>
                </td>
                <td class="weight-value">
                  144.177
                  <br />
                  <br /> C<sub>9</sub>H<sub>8</sub>N<sub>2</sub>
                </td>
                <td class="structure-value">
                  <a
                    class="moldbi-vector-thumbnail"
                    href="/structures/DB12537/image.svg"
                  >
                    <img src="/structures/DB12537/thumb.svg" />
                  </a>
                </td>
                <td class="description-value">
                  Benzodiazepine is under investigation for the prevention of
                  Delirium and C.Surgical Procedure; Cardiac. Benzodiazepine has
                  been investigated for the treatment of Obesity, Sleep Apnea,
                  Obstructive, and Disorders of Gallbladder, Biliary...
                </td>
                <td class="categories-value">
                  <a href="/categories/DBCAT000451">Benzazepines</a>
                  <span class="text-muted"> / </span>
                  <a href="/categories/DBCAT000450">
                    Benzodiazepines and benzodiazepine derivatives
                  </a>
                  <span class="text-muted"> / </span>
                  <a href="/categories/DBCAT004901">
                    Benzodiazepines, antagonists &amp; inhibitors
                  </a>
                </td>
              </tr>
              <tr>
                <td class="name-value text-sm-center drug-name">
                  <strong>
                    <a href="/drugs/DB14099">1,2-Distearoyllecithin</a>
                  </strong>
                </td>
                <td class="weight-value">
                  790.161
                  <br />
                  <br /> C<sub>44</sub>H<sub>88</sub>NO<sub>8</sub>P
                </td>
                <td class="structure-value">
                  <a
                    class="moldbi-vector-thumbnail"
                    href="/structures/DB14099/image.svg"
                  >
                    <img src="/structures/DB14099/thumb.svg" />
                  </a>
                </td>
                <td class="description-value">
                  <span class="not-available">Not Annotated</span>
                </td>
                <td class="categories-value">
                  <a href="/categories/DBCAT001466">Glycerophosphates</a>
                  <span class="text-muted"> / </span>
                  <a href="/categories/DBCAT001464">Glycerophospholipids</a>
                  <span class="text-muted"> / </span>
                  <a href="/categories/DBCAT000178">Lipids</a>
                  <span class="text-muted"> / </span>
                  <a href="/categories/DBCAT000313">Membrane Lipids</a>
                  <span class="text-muted"> / </span>
                  <a href="/categories/DBCAT001465">Phosphatidic Acids</a>
                  <span class="text-muted"> / </span>
                  <a href="/categories/DBCAT001467">Phospholipids</a>
                  <span class="text-muted"> / </span>
                  <a href="/categories/DBCAT002603">
                    Ultrasound Contrast Media
                  </a>
                </td>
              </tr>
              <tr>
                <td class="name-value text-sm-center drug-name">
                  <strong>
                    <a href="/drugs/DB14096">
                      1,2-icosapentoyl-sn-glycero-3-phosphoserine
                    </a>
                  </strong>
                </td>
                <td class="weight-value">
                  842.064
                  <br />
                  <br /> C<sub>47</sub>H<sub>72</sub>NO<sub>10</sub>P
                </td>
                <td class="structure-value">
                  <a
                    class="moldbi-vector-thumbnail"
                    href="/structures/DB14096/image.svg"
                  >
                    <img src="/structures/DB14096/thumb.svg" />
                  </a>
                </td>
                <td class="description-value">
                  <span class="not-available">Not Annotated</span>
                </td>
                <td class="categories-value">
                  <span class="not-available">Not Annotated</span>
                </td>
              </tr>
              <tr>
                <td class="name-value text-sm-center drug-name">
                  <strong>
                    <a href="/drugs/DB11496">2-mercaptobenzothiazole</a>
                  </strong>
                </td>
                <td class="weight-value">
                  167.251
                  <br />
                  <br /> C<sub>7</sub>H<sub>5</sub>NS<sub>2</sub>
                </td>
                <td class="structure-value">
                  <a
                    class="moldbi-vector-thumbnail"
                    href="/structures/DB11496/image.svg"
                  >
                    <img src="/structures/DB11496/thumb.svg" />
                  </a>
                </td>
                <td class="description-value">
                  <span class="not-available">Not Annotated</span>
                </td>
                <td class="categories-value">
                  <a href="/categories/DBCAT003420">
                    Standardized Chemical Allergen
                  </a>
                </td>
              </tr>
              <tr>
                <td class="name-value text-sm-center drug-name">
                  <strong>
                    <a href="/drugs/DB14201">2,2'-Dibenzothiazyl disulfide</a>
                  </strong>
                </td>
                <td class="weight-value">
                  332.47
                  <br />
                  <br /> C<sub>14</sub>H<sub>8</sub>N<sub>2</sub>S<sub>4</sub>
                </td>
                <td class="structure-value">
                  <a
                    class="moldbi-vector-thumbnail"
                    href="/structures/DB14201/image.svg"
                  >
                    <img src="/structures/DB14201/thumb.svg" />
                  </a>
                </td>
                <td class="description-value">
                  2,2'-Dibenzothiazyl disulfide is approved for use within
                  allergenic epicutaneous patch tests which are indicated for
                  use as an aid in the diagnosis of allergic contact dermatitis
                  (ACD) in persons 6...
                </td>
                <td class="categories-value">
                  <a href="/categories/DBCAT003929">Latex Hypersensitivity</a>
                  <span class="text-muted"> / </span>
                  <a href="/categories/DBCAT003420">
                    Standardized Chemical Allergen
                  </a>
                </td>
              </tr>
              <tr>
                <td class="name-value text-sm-center drug-name">
                  <strong>
                    <a href="/drugs/DB14195">4-(Isopropylamino)diphenylamine</a>
                  </strong>
                </td>
                <td class="weight-value">
                  226.323
                  <br />
                  <br /> C<sub>15</sub>H<sub>18</sub>N<sub>2</sub>
                </td>
                <td class="structure-value">
                  <a
                    class="moldbi-vector-thumbnail"
                    href="/structures/DB14195/image.svg"
                  >
                    <img src="/structures/DB14195/thumb.svg" />
                  </a>
                </td>
                <td class="description-value">
                  4-(Isopropylamino)diphenylamine is approved for use within
                  allergenic epicutaneous patch tests which are indicated for
                  use as an aid in the diagnosis of allergic contact dermatitis
                  (ACD) in persons 6 years...
                </td>
                <td class="categories-value">
                  <a href="/categories/DBCAT000368">Antioxidants</a>
                  <span class="text-muted"> / </span>
                  <a href="/categories/DBCAT003420">
                    Standardized Chemical Allergen
                  </a>
                </td>
              </tr>
              <tr>
                <td class="name-value text-sm-center drug-name">
                  <strong>
                    <a href="/drugs/DB01632">
                      5-O-phosphono-alpha-D-ribofuranosyl diphosphate
                    </a>
                  </strong>
                </td>
                <td class="weight-value">
                  390.0696
                  <br />
                  <br /> C<sub>5</sub>H<sub>13</sub>O<sub>14</sub>P<sub>3</sub>
                </td>
                <td class="structure-value">
                  <a
                    class="moldbi-vector-thumbnail"
                    href="/structures/DB01632/image.svg"
                  >
                    <img src="/structures/DB01632/thumb.svg" />
                  </a>
                </td>
                <td class="description-value">
                  The key substance in the biosynthesis of histidine,
                  tryptophan, and purine and pyrimidine nucleotides.
                </td>
                <td class="categories-value">
                  <a href="/categories/DBCAT002912">Pentosephosphates</a>
                </td>
              </tr>
              <tr>
                <td class="name-value text-sm-center drug-name">
                  <strong>
                    <a href="/drugs/DB01048">Abacavir</a>
                  </strong>
                </td>
                <td class="weight-value">
                  286.3323
                  <br />
                  <br /> C<sub>14</sub>H<sub>18</sub>N<sub>6</sub>O
                </td>
                <td class="structure-value">
                  <a
                    class="moldbi-vector-thumbnail"
                    href="/structures/DB01048/image.svg"
                  >
                    <img src="/structures/DB01048/thumb.svg" />
                  </a>
                </td>
                <td class="description-value">
                  An antiviral nucleoside reverse transcriptase inhibitor used
                  in combination with other antiretrovirals for the treatment of
                  HIV.
                </td>
                <td class="categories-value">
                  <a href="/categories/DBCAT000124">Anti-HIV Agents</a>
                  <span class="text-muted"> / </span>
                  <a href="/categories/DBCAT003359">
                    Human Immunodeficiency Virus Nucleoside Analog Reverse
                    Transcriptase Inhibitor
                  </a>
                  <span class="text-muted"> / </span>
                  <a href="/categories/DBCAT002376">
                    Nucleoside and Nucleotide Reverse Transcriptase Inhibitors
                  </a>
                  <span class="text-muted"> / </span>
                  <a href="/categories/DBCAT000594">
                    Reverse Transcriptase Inhibitors
                  </a>
                </td>
              </tr>
              <tr>
                <td class="name-value text-sm-center drug-name">
                  <strong>
                    <a href="/drugs/DB11932">Abametapir</a>
                  </strong>
                </td>
                <td class="weight-value">
                  184.242
                  <br />
                  <br /> C<sub>12</sub>H<sub>12</sub>N<sub>2</sub>
                </td>
                <td class="structure-value">
                  <a
                    class="moldbi-vector-thumbnail"
                    href="/structures/DB11932/image.svg"
                  >
                    <img src="/structures/DB11932/thumb.svg" />
                  </a>
                </td>
                <td class="description-value">
                  A pediculicide metalloproteinase used topically in the
                  treatment of head lice infection.
                </td>
                <td class="categories-value">
                  <a href="/categories/DBCAT002212">
                    Antiparasitic Products, Insecticides and Repellents
                  </a>
                  <span class="text-muted"> / </span>
                  <a href="/categories/DBCAT000402">
                    Cytochrome P-450 CYP1A2 Inhibitors
                  </a>
                  <span class="text-muted"> / </span>
                  <a href="/categories/DBCAT004503">
                    Cytochrome P-450 CYP1A2 Inhibitors (strength unknown)
                  </a>
                  <span class="text-muted"> / </span>
                  <a href="/categories/DBCAT002609">
                    Cytochrome P-450 CYP1A2 Substrates
                  </a>
                  <span class="text-muted"> / </span>
                  <a href="/categories/DBCAT001285">
                    Cytochrome P-450 CYP2B6 Inhibitors
                  </a>
                  <span class="text-muted"> / </span>
                  <a href="/categories/DBCAT004517">
                    Cytochrome P-450 CYP2B6 Inhibitors (strength unknown)
                  </a>
                  <span class="text-muted"> / </span>
                  <a href="/categories/DBCAT000934">
                    Cytochrome P-450 CYP3A Inhibitors
                  </a>
                  <span class="text-muted"> / </span>
                  <a href="/categories/DBCAT003232">
                    Cytochrome P-450 CYP3A4 Inhibitors
                  </a>
                  <span class="text-muted"> / </span>
                  <a href="/categories/DBCAT004049">
                    Cytochrome P-450 CYP3A4 Inhibitors (strength unknown)
                  </a>
                  <span class="text-muted"> / </span>
                  <a href="/categories/DBCAT000394">
                    Cytochrome P-450 Enzyme Inhibitors
                  </a>
                  <span class="text-muted"> / </span>
                  <a href="/categories/DBCAT005101">
                    Cytochrome P-450 Substrates
                  </a>
                  <span class="text-muted"> / </span>
                  <a href="/categories/DBCAT002370">
                    Ectoparasiticides, Incl. Scabicides
                  </a>
                  <span class="text-muted"> / </span>
                  <a href="/categories/DBCAT002371">
                    Ectoparasiticides, Incl. Scabicides, Insecticides and
                    Repellents
                  </a>
                  <span class="text-muted"> / </span>
                  <a href="/categories/DBCAT001461">
                    Matrix Metalloproteinase Inhibitors
                  </a>
                  <span class="text-muted"> / </span>
                  <a href="/categories/DBCAT002731">Pediculicides</a>
                  <span class="text-muted"> / </span>
                  <a href="/categories/DBCAT000227">Pyridines</a>
                </td>
              </tr>
              <tr>
                <td class="name-value text-sm-center drug-name">
                  <strong>
                    <a href="/drugs/DB00106">Abarelix</a>
                  </strong>
                </td>
                <td class="weight-value">
                  1416.09
                  <br />
                  <br /> C<sub>72</sub>H<sub>95</sub>ClN<sub>14</sub>O
                  <sub>14</sub>
                </td>
                <td class="structure-value">
                  <a
                    class="moldbi-vector-thumbnail"
                    href="/structures/DB00106/image.svg"
                  >
                    <img src="/structures/DB00106/thumb.svg" />
                  </a>
                </td>
                <td class="description-value">
                  For palliative treatment of advanced prostate cancer.
                </td>
                <td class="categories-value">
                  <a href="/categories/DBCAT000144">Hormone Antagonists</a>
                </td>
              </tr>
              <tr>
                <td class="name-value text-sm-center drug-name">
                  <strong>
                    <a href="/drugs/DB12001">Abemaciclib</a>
                  </strong>
                </td>
                <td class="weight-value">
                  506.606
                  <br />
                  <br /> C<sub>27</sub>H<sub>32</sub>F<sub>2</sub>N<sub>8</sub>
                </td>
                <td class="structure-value">
                  <a
                    class="moldbi-vector-thumbnail"
                    href="/structures/DB12001/image.svg"
                  >
                    <img src="/structures/DB12001/thumb.svg" />
                  </a>
                </td>
                <td class="description-value">
                  A medication used to treat HR+ HER2- advanced or metastatic
                  breast cancer.
                </td>
                <td class="categories-value">
                  <a href="/categories/DBCAT005751">
                    Cyclin-dependent kinase (CDK) inhibitors
                  </a>
                  <span class="text-muted"> / </span>
                  <a href="/categories/DBCAT000737">
                    Protein Kinase Inhibitors
                  </a>
                </td>
              </tr>
              <tr>
                <td class="name-value text-sm-center drug-name">
                  <strong>
                    <a href="/drugs/DB05812">Abiraterone</a>
                  </strong>
                </td>
                <td class="weight-value">
                  349.509
                  <br />
                  <br /> C<sub>24</sub>H<sub>31</sub>NO
                </td>
                <td class="structure-value">
                  <a
                    class="moldbi-vector-thumbnail"
                    href="/structures/DB05812/image.svg"
                  >
                    <img src="/structures/DB05812/thumb.svg" />
                  </a>
                </td>
                <td class="description-value">
                  An antiandrogen used in the treatment of prostate cancer.
                </td>
                <td class="categories-value">
                  <a href="/categories/DBCAT000980">Androstenes</a>
                  <span class="text-muted"> / </span>
                  <a href="/categories/DBCAT000024">Antineoplastic Agents</a>
                  <span class="text-muted"> / </span>
                  <a href="/categories/DBCAT000394">
                    Cytochrome P-450 Enzyme Inhibitors
                  </a>
                  <span class="text-muted"> / </span>
                  <a href="/categories/DBCAT003461">
                    Cytochrome P450 17A1 Inhibitors
                  </a>
                  <span class="text-muted"> / </span>
                  <a href="/categories/DBCAT000487">
                    Steroid Synthesis Inhibitors
                  </a>
                </td>
              </tr>
              <tr>
                <td class="name-value text-sm-center drug-name">
                  <strong>
                    <a href="/drugs/DB14973">Abrocitinib</a>
                  </strong>
                </td>
                <td class="weight-value">
                  323.42
                  <br />
                  <br /> C<sub>14</sub>H<sub>21</sub>N<sub>5</sub>O<sub>2</sub>S
                </td>
                <td class="structure-value">
                  <a
                    class="moldbi-vector-thumbnail"
                    href="/structures/DB14973/image.svg"
                  >
                    <img src="/structures/DB14973/thumb.svg" />
                  </a>
                </td>
                <td class="description-value">
                  A kinase inhibitor used to treat moderate-to-severe atopic
                  dermatitis in adults.
                </td>
                <td class="categories-value">
                  <a href="/categories/DBCAT002323">
                    Agents for Dermatitis, Excluding Corticosteroids
                  </a>
                </td>
              </tr>
              <tr>
                <td class="name-value text-sm-center drug-name">
                  <strong>
                    <a href="/drugs/DB11703">Acalabrutinib</a>
                  </strong>
                </td>
                <td class="weight-value">
                  465.517
                  <br />
                  <br /> C<sub>26</sub>H<sub>23</sub>N<sub>7</sub>O<sub>2</sub>
                </td>
                <td class="structure-value">
                  <a
                    class="moldbi-vector-thumbnail"
                    href="/structures/DB11703/image.svg"
                  >
                    <img src="/structures/DB11703/thumb.svg" />
                  </a>
                </td>
                <td class="description-value">
                  A Bruton tyrosine kinase inhibitor used to treat mantle cell
                  lymphoma, chronic lymphocytic leukemia, and small lymphocytic
                  lymphoma.
                </td>
                <td class="categories-value">
                  <a href="/categories/DBCAT005749">
                    Bruton's tyrosine kinase (BTK) inhibitors
                  </a>
                  <span class="text-muted"> / </span>
                  <a href="/categories/DBCAT000737">
                    Protein Kinase Inhibitors
                  </a>
                </td>
              </tr>
              <tr>
                <td class="name-value text-sm-center drug-name">
                  <strong>
                    <a href="/drugs/DB00659">Acamprosate</a>
                  </strong>
                </td>
                <td class="weight-value">
                  181.21
                  <br />
                  <br /> C<sub>5</sub>H<sub>11</sub>NO<sub>4</sub>S
                </td>
                <td class="structure-value">
                  <a
                    class="moldbi-vector-thumbnail"
                    href="/structures/DB00659/image.svg"
                  >
                    <img src="/structures/DB00659/thumb.svg" />
                  </a>
                </td>
                <td class="description-value">
                  A medication used to maintain alcohol abstinence in patients
                  with alcohol dependence.
                </td>
                <td class="categories-value">
                  <a href="/categories/DBCAT001048">Alcohol Deterrents</a>
                  <span class="text-muted"> / </span>
                  <a href="/categories/DBCAT002441">
                    Drugs Used in Alcohol Dependence
                  </a>
                </td>
              </tr>
              <tr>
                <td class="name-value text-sm-center drug-name">
                  <strong>
                    <a href="/drugs/DB00284">Acarbose</a>
                  </strong>
                </td>
                <td class="weight-value">
                  645.608
                  <br />
                  <br /> C<sub>25</sub>H<sub>43</sub>NO<sub>18</sub>
                </td>
                <td class="structure-value">
                  <a
                    class="moldbi-vector-thumbnail"
                    href="/structures/DB00284/image.svg"
                  >
                    <img src="/structures/DB00284/thumb.svg" />
                  </a>
                </td>
                <td class="description-value">
                  An alpha-glucosidase inhibitor used in adjunctly with diet and
                  exercise for the management of glycemic control in patients
                  with type 2 diabetes mellitus.
                </td>
                <td class="categories-value">
                  <a href="/categories/DBCAT000670">
                    Glycoside Hydrolase Inhibitors
                  </a>
                  <span class="text-muted"> / </span>
                  <a href="/categories/DBCAT000667">Trisaccharides</a>
                </td>
              </tr>
              <tr>
                <td class="name-value text-sm-center drug-name">
                  <strong>
                    <a href="/drugs/DB01193">Acebutolol</a>
                  </strong>
                </td>
                <td class="weight-value">
                  336.4259
                  <br />
                  <br /> C<sub>18</sub>H<sub>28</sub>N<sub>2</sub>O<sub>4</sub>
                </td>
                <td class="structure-value">
                  <a
                    class="moldbi-vector-thumbnail"
                    href="/structures/DB01193/image.svg"
                  >
                    <img src="/structures/DB01193/thumb.svg" />
                  </a>
                </td>
                <td class="description-value">
                  A selective β1-receptor antagonist used for the management of
                  hypertension and ventricular premature beats in adults.
                </td>
                <td class="categories-value">
                  <a href="/categories/DBCAT000410">Antihypertensive Agents</a>
                  <span class="text-muted"> / </span>
                  <a href="/categories/DBCAT002186">
                    Beta Blocking Agents, Selective
                  </a>
                  <span class="text-muted"> / </span>
                  <a href="/categories/DBCAT002265">
                    Beta Blocking Agents, Selective, and Thiazides
                  </a>
                </td>
              </tr>
              <tr>
                <td class="name-value text-sm-center drug-name">
                  <strong>
                    <a href="/drugs/DB13262">Aceclidine</a>
                  </strong>
                </td>
                <td class="weight-value">
                  169.224
                  <br />
                  <br /> C<sub>9</sub>H<sub>15</sub>NO<sub>2</sub>
                </td>
                <td class="structure-value">
                  <a
                    class="moldbi-vector-thumbnail"
                    href="/structures/DB13262/image.svg"
                  >
                    <img src="/structures/DB13262/thumb.svg" />
                  </a>
                </td>
                <td class="description-value">
                  Aceclidine has been marketed in Europe but has not been used
                  clinically in the United States. It is used in the treatment
                  of open-angle glaucoma and is a parasympathomimetic agent.
                </td>
                <td class="categories-value">
                  <a href="/categories/DBCAT000448">Parasympathomimetics</a>
                </td>
              </tr>
              <tr>
                <td class="name-value text-sm-center drug-name">
                  <strong>
                    <a href="/drugs/DB06736">Aceclofenac</a>
                  </strong>
                </td>
                <td class="weight-value">
                  354.18
                  <br />
                  <br /> C<sub>16</sub>H<sub>13</sub>Cl<sub>2</sub>NO
                  <sub>4</sub>
                </td>
                <td class="structure-value">
                  <a
                    class="moldbi-vector-thumbnail"
                    href="/structures/DB06736/image.svg"
                  >
                    <img src="/structures/DB06736/thumb.svg" />
                  </a>
                </td>
                <td class="description-value">
                  Aceclofenac is indicated for the relief of pain and
                  inflammation in osteoarthritis, rheumatoid arthritis and
                  ankylosing spondylitis.
                </td>
                <td class="categories-value">
                  <a href="/categories/DBCAT002310">
                    Acetic Acid Derivatives and Related Substances
                  </a>
                  <span class="text-muted"> / </span>
                  <a href="/categories/DBCAT002313">
                    Antiinflammatory Preparations, Non-Steroids for Topical Use
                  </a>
                </td>
              </tr>
              <tr>
                <td class="name-value text-sm-center drug-name">
                  <strong>
                    <a href="/drugs/DB13783">Acemetacin</a>
                  </strong>
                </td>
                <td class="weight-value">
                  415.83
                  <br />
                  <br /> C<sub>21</sub>H<sub>18</sub>ClNO<sub>6</sub>
                </td>
                <td class="structure-value">
                  <a
                    class="moldbi-vector-thumbnail"
                    href="/structures/DB13783/image.svg"
                  >
                    <img src="/structures/DB13783/thumb.svg" />
                  </a>
                </td>
                <td class="description-value">
                  A NSAID indicated in the treatment of pain and inflammation.
                </td>
                <td class="categories-value">
                  <a href="/categories/DBCAT002310">
                    Acetic Acid Derivatives and Related Substances
                  </a>
                </td>
              </tr>
              <tr>
                <td class="name-value text-sm-center drug-name">
                  <strong>
                    <a href="/drugs/DB01418">Acenocoumarol</a>
                  </strong>
                </td>
                <td class="weight-value">
                  353.3255
                  <br />
                  <br /> C<sub>19</sub>H<sub>15</sub>NO<sub>6</sub>
                </td>
                <td class="structure-value">
                  <a
                    class="moldbi-vector-thumbnail"
                    href="/structures/DB01418/image.svg"
                  >
                    <img src="/structures/DB01418/thumb.svg" />
                  </a>
                </td>
                <td class="description-value">
                  An anticoagulant drug used in the prevention of thromboembolic
                  diseases in infarction and transient ischemic attacks, as well
                  as management of deep vein thrombosis and myocardial
                  infarction.
                </td>
                <td class="categories-value">
                  <a href="/categories/DBCAT002267">Vitamin K Antagonists</a>
                </td>
              </tr>
              <tr>
                <td class="name-value text-sm-center drug-name">
                  <strong>
                    <a href="/drugs/DB00316">Acetaminophen</a>
                  </strong>
                </td>
                <td class="weight-value">
                  151.1626
                  <br />
                  <br /> C<sub>8</sub>H<sub>9</sub>NO<sub>2</sub>
                </td>
                <td class="structure-value">
                  <a
                    class="moldbi-vector-thumbnail"
                    href="/structures/DB00316/image.svg"
                  >
                    <img src="/structures/DB00316/thumb.svg" />
                  </a>
                </td>
                <td class="description-value">
                  An analgesic drug used alone or in combination with opioids
                  for pain management, and as an antipyretic agent.
                </td>
                <td class="categories-value">
                  <a href="/categories/DBCAT000599">Anilides</a>
                </td>
              </tr>
              <tr>
                <td class="name-value text-sm-center drug-name">
                  <strong>
                    <a href="/drugs/DB13268">Acetarsol</a>
                  </strong>
                </td>
                <td class="weight-value">
                  275.0903
                  <br />
                  <br /> C<sub>8</sub>H<sub>10</sub>AsNO<sub>5</sub>
                </td>
                <td class="structure-value">
                  <a
                    class="moldbi-vector-thumbnail"
                    href="/structures/DB13268/image.svg"
                  >
                    <img src="/structures/DB13268/thumb.svg" />
                  </a>
                </td>
                <td class="description-value">
                  An anti infective used to treat a wide variety of infections
                  in the body.
                </td>
                <td class="categories-value">
                  <a href="/categories/DBCAT001515">Arsenicals</a>
                </td>
              </tr>
              <tr>
                <td class="name-value text-sm-center drug-name">
                  <strong>
                    <a href="/drugs/DB00819">Acetazolamide</a>
                  </strong>
                </td>
                <td class="weight-value">
                  222.245
                  <br />
                  <br /> C<sub>4</sub>H<sub>6</sub>N<sub>4</sub>O<sub>3</sub>S
                  <sub>2</sub>
                </td>
                <td class="structure-value">
                  <a
                    class="moldbi-vector-thumbnail"
                    href="/structures/DB00819/image.svg"
                  >
                    <img src="/structures/DB00819/thumb.svg" />
                  </a>
                </td>
                <td class="description-value">
                  A carbonic anhydrase inhibitor used to treat edema from heart
                  failure or medications, certain types of epilepsy, and
                  glaucoma.
                </td>
                <td class="categories-value">
                  <a href="/categories/DBCAT000514">Sulfonamides</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div> */}
      </div>
    </React.Fragment>
  );
};

export default Home;
