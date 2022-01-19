using Microsoft.AspNetCore.Mvc;

namespace interview.Controllers;

[ApiController]
[Route("api/[controller]")]

public class NimGameController : ControllerBase
{

    private readonly ILogger<NimGameController> _logger;
    public NimGameController(ILogger<NimGameController> logger)
    {
        _logger = logger;
    }

    [HttpPost]

    public IActionResult Post([FromBody] Nim nimput)
    {
        if (nimput.total >= 21)
        {
            return Ok(new Nim { gameOver = true, playerTurn = true, playerWon = false, total = nimput.total, choice = 0 });
        }
        else if (nimput.total == 20)
        {
            return Ok(new Nim { gameOver = true, playerTurn = true, playerWon = true, total = nimput.total + 1, choice = 1 });
        }
        else
        {
            var choice = nimput.total % 4 != 0 ? 4 - (nimput.total % 4) : Random.Shared.Next(1, 4);

            return Ok(new { total = nimput.total + nimput.choice + choice, choice = choice, playerTurn = true, gameOver = false });

        }
    }

    [HttpGet]
    public IActionResult Get()
    {
        return Ok(new { total = 1, choice = 1 });
    }
}
