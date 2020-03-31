import React from "react";
import { Button, Card, Grid, Header, Image, Label } from "semantic-ui-react";
import ReactCloudinaryUploader from "@app-masters/react-cloudinary-uploader";
import "../assets/style.css";
export class VehicleImagesForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholderUrl: "../img_placeholder.png",

      files: [
        {
          name: "coverImg",
          img: undefined,
          text: "Front"
        },
        { name: "img1", img: undefined, text: "Left Side" },
        { name: "img2", img: undefined, text: "Right Side" },
        { name: "img3", img: undefined, text: "Back" },
        { name: "img4", img: undefined, text: "Dashboard" },
        { name: "img5", img: undefined, text: "Interior" }
      ],
      options: {
        cloud_name: "zee-cloud",
        upload_preset: "fdcyr3ap",
        multiple: false,
        returnJustUrl: false,
        showPoweredBy: false
      }
    };
  }

  handleFileCover = e => {
    let elid = e.target.id;
    let files = this.state.files;
    ReactCloudinaryUploader.open(this.state.options)
      .then(image => {
        files.filter(item => {
          if (item.name === elid) {
            item.img = image.secure_url;
          }
        });
        this.setState({ files });
        // files.map(item => {
        //   if (item.name === e.target.id) {
        //     this.setState({ coverUrl: image });
        //     console.log(this.state, image);
        //   }
        // });
      })
      .catch(err => {
        console.error(err);
      });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.files[0],
      files: [...this.state.files, e.target.files[0]],
      [e.target.name]: e.target.files[0]
        ? URL.createObjectURL(e.target.files[0])
        : undefined
    });
  };
  hover = id => {
    let files = this.state.files;
    files.filter(item => {
      if (item.name === id) {
        if (item.img) {
          let el = document.getElementById(id);
          el = el.nextElementSibling;
          el.classList.remove("hidden");
        }
      }
    });
  };
  notHover = id => {
    let el = document.getElementById(id);
    el = el.nextElementSibling;
    el.classList.add("hidden");
  };
  filter = name => {
    let files = this.state.files;
    files.filter(item => {
      if (item.name === name) {
        return item;
      }
    });
  };
  ReplaceImage = e => {
    let files = this.state.files;
    files.filter(item => {
      if (item.name === e.target.id) {
        item.img = undefined;
      }
    });
    this.setState({ files });
  };
  render() {
    const { prevStep, nextStep } = this.props;
    return (
      <Card fluid>
        <Card.Content>
          <Header content="Some Images" />
        </Card.Content>
        <Card.Content>
          <Grid textAlign="center" columns={3}>
            {this.state.files.map((file, index) => {
              return (
                <Grid.Column
                  key={file.text}
                  align="center"
                  name={file.name}
                  style={{ height: "240px", width: "200px" }}
                >
                  <label htmlFor="cover">
                    <Image
                      id={file.name}
                      fluid
                      onMouseEnter={() => {
                        this.hover(file.name);
                      }}
                      onMouseLeave={() => {
                        this.notHover(file.name);
                      }}
                      src={
                        this.state.files[index].img === undefined
                          ? this.state.placeholderUrl
                          : this.state.files[index].img
                      }
                      onClick={
                        this.state.files[index].img === undefined
                          ? this.handleFileCover
                          : () => {}
                      }
                      style={{
                        height: "70%",
                        width: "100%",
                        paddingTop: "0px",
                        margin: " 15px 0px",
                        cursor:
                          this.state.files[index].img === undefined
                            ? "pointer"
                            : "default"
                      }}
                    />
                    <span
                      className="imageReplacer hidden"
                      id={file.name}
                      onMouseEnter={() => {
                        this.hover(file.name);
                      }}
                      onClick={e => {
                        this.ReplaceImage(e);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      X
                    </span>
                  </label>
                  <Label
                    style={{ backgroundColor: "transparent" }}
                    attached="top"
                    content={"Vehicle " + file.text}
                  />
                </Grid.Column>
              );
            })}
          </Grid>
        </Card.Content>
        <Card.Content>
          <Button
            type="submit"
            content="Next"
            positive
            onClick={() => nextStep(this.state.files)}
            floated="right"
          />
          <Button
            type="submit"
            content="Back"
            secondary
            onClick={prevStep}
            floated="right"
          />
        </Card.Content>
      </Card>
    );
  }
}
