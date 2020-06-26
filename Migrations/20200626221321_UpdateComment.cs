using Microsoft.EntityFrameworkCore.Migrations;

namespace TheMovieList.Migrations
{
    public partial class UpdateComment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "CommentId",
                table: "User",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "CommentId1",
                table: "User",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_User_CommentId",
                table: "User",
                column: "CommentId");

            migrationBuilder.CreateIndex(
                name: "IX_User_CommentId1",
                table: "User",
                column: "CommentId1");

            migrationBuilder.AddForeignKey(
                name: "FK_User_Comments_CommentId",
                table: "User",
                column: "CommentId",
                principalTable: "Comments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_User_Comments_CommentId1",
                table: "User",
                column: "CommentId1",
                principalTable: "Comments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_User_Comments_CommentId",
                table: "User");

            migrationBuilder.DropForeignKey(
                name: "FK_User_Comments_CommentId1",
                table: "User");

            migrationBuilder.DropIndex(
                name: "IX_User_CommentId",
                table: "User");

            migrationBuilder.DropIndex(
                name: "IX_User_CommentId1",
                table: "User");

            migrationBuilder.DropColumn(
                name: "CommentId",
                table: "User");

            migrationBuilder.DropColumn(
                name: "CommentId1",
                table: "User");
        }
    }
}
